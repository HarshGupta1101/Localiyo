const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const store = require("../middleware/multer");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const moment = require('moment');
const crypto = require('crypto');
const flash = require('connect-flash');


//for image
const ImgageModel = require('../src/models/uploadimg');
const forummodel = require('../src/models/discussion');
const commentmodel = require('../src/models/comment');
const fs = require('fs');
const { error } = require('console');

const port = process.env.PORT || 9000;
require("./db/conn");
const postmodel = require('./models/feed');
require("./models/uploadimg");
const { log } = require('console');
const usermodel = require('./models/login');


// setting session 
const session_store = new MongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "Session_details",
}

);

app.use(
    session({
        secret: "secret key for localiyo",
        resave: false,
        saveUninitialized: false,
        store: session_store,

    })
);

app.use(flash());

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        // console.log(req.session.user.username);
        next();
    } else {
        res.redirect("/login")
    }
};




// for email verification
API_KEY = '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';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(API_KEY)


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    const is_auth = req.session.isAuth;
    if (is_auth) {
        res.render("index", {
            navbar_item: "Feeds",
            navbar_ref: "/feed"
        })
    } else {
        res.render("index", {
            navbar_item: "Sign In",
            navbar_ref: "/login"
        })
    }
})


// calling route 
app.use('/', require('../router/router'))

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// forget password
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

hbs.registerHelper('if_equal', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});




app.post("/feedimage", store.array("images"), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('please chosee files');
        error.httpStatusCode = 400;
        return next(error)
    }

})



app.post("/feed", isAuth, store.array('images'), async (req, res, next) => {
    try {
        const files = req.files;
        const uname = req.session.user.username;
        var userd = await usermodel.findOne({ 'username': uname });
        var pcode = userd.pincode;
        const postdata = await postmodel.find();
        const postdatanew = new postmodel({
            content: req.body.postcontent,
            username: uname,
            postpcode: pcode,
        })


        // res.redirect('/feed')
        if (!files) {
            const error = new Error('please chosee files');
            error.httpStatusCode = 400;
            return next(error)
        }
        // convert images into Base64 encoding
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)
            return encoded_image = img.toString('base64')
        })


        let result = imgArray.map((src, index) => {
            //create object to store data in collection
            let finalimg = {
                filename: files[index].filename,
                contentType: files[index].mimetype,
                imageBase64: src,
                postid: postdatanew._id,
            }
            postdatanew.postimgone.push(finalimg.imageBase64);

        })
        await postdatanew.save();

        res.redirect('/feed');

    }
    catch (error) {
        res.send(error);
    }
})




app.get("/feed", isAuth, async (req, res) => {
    try {
        var uname = req.session.user.username;
        var userd = await usermodel.findOne({ 'username': uname });
        var alldetail = await usermodel.find();
        var pcode = userd.pincode;
        var profilephoto = userd.profilephoto;
        const mypostdata = await postmodel.find({ 'postpcode': pcode }).sort({ 'createdAt': -1 });


        alldetail.forEach(user => {
            mypostdata.forEach(post => {
                if (user.username == post.username) {
                    post.postuserphoto = user.profilephoto;
                }
            });
        });


        const postimg = await ImgageModel.find();
        mypostdata.forEach((element) => {
            element.sincetime = moment(element.createdAt).fromNow();
        });

        mypostdata.forEach((element) => {
            if (element.likes.includes(uname)) {
                element.islike = true
            } else {
                element.islike = false
            }
            element.iscount = element.likes.length;

            if (element.report.includes(uname)) {
                element.isreport = true
            } else {
                element.isreport = false
            }
            element.iscountreport = element.report.length;
            if (element.iscountreport >= 1) {
                element.remove();
            }


        });

        res.render('feed',
            { postcontent: mypostdata, postimg: postimg, profilephoto: profilephoto, userd: userd, pcode: pcode, username: uname, dusername: uname }
        )


    } catch (error) {
        res.send(error);
    }
})



app.get("/news", (req, res) => {
    if (req.session.isAuth) {
        res.render("news", {
            nav_item: "Feeds",
            nav_ref: "/feed"
        })
    } else {
        res.render("news", {
            nav_item: "Sign In",
            nav_ref: "/login"
        })
    }

})


app.get("/error", (req, res) => {
    res.render("error")
})

app.get("/profile", async (req, res) => {
    const username = req.session.user.username;
    const userdetail = await usermodel.findOne({ username: username });
    res.render("profile", { detail: userdetail });

})

app.get("/login", (req, res) => {
    if (req.session.isAuth) {
        res.redirect('/feed');
    } else {
        res.render("login");
    }
})

//validate user 
app.post("/login", async (req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        const useremail = await usermodel.findOne({ username: username });
        if (useremail.password === password && useremail.isVerified) {
            req.session.isAuth = true;
            req.session.user = { username: username };
            req.session.save();
            // console.log(req.session);
            // console.log(req.session.id);
            res.status(201).redirect('/feed');
        } else {
            res.render('login', { isnotauth: true })
        }

    } catch (error) {
        res.status(400).send(" invalid ")
    }
})




app.post("/signup", async (req, res) => {

    var newUser = new usermodel({
        username: req.body.username,
        emailid: req.body.email,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false,
        password: req.body.password,
        pincode: req.body.pincode,
    });
    await newUser.save();

    const msg = {

        from: 'vitminiproj@gmail.com',

        to: newUser.emailid,

        subject: 'Localiyo - Verify Your Account',

        text: `

            Hello, Thanks For Registering On Our Website.

            Kindly Verify Your Email ID By Clicking On This Link :

            http://${req.headers.host}/verify-account?token=${newUser.emailToken}

            `,

        html: `
            <h1>Localiyo</h1>
            <p>Hello, Thanks For Registering On Our Website.</p>
            <p>Kindly Verify Your Email ID By Clicking On This Link : </p>
            <a href = "http://${req.headers.host}/verify-account?token=${newUser.emailToken}">Verify Your Account</a>
            `
    }

    try {

        await sgMail.send(msg);
        res.redirect('/login');

    } catch (error) {

        console.log(error);
        res.redirect('/login')

    }



});


app.get('/verify-account', async (req, res, next) => {

    try {

        const user = await usermodel.findOne({ emailToken: req.query.token });

        if (!user) {

            req.flash('error', 'Token Is Invalid Or Expired. Please Contact Us At support@localiyo.com For Assistance.');

            return res.redirect('/login');

        }

        user.emailToken = null;

        user.isVerified = true;

        await user.save();



    } catch (error) {

        console.log(error);

        req.flash('error', 'Token Is Invalid Or Expired. Please Contact Us At support@localiyo.com For Assistance.');

        res.redirect('/login');

    }

});


app.post("/editphoto", isAuth, store.array('profileimg'), async (req, res, next) => {

    try {
        const files = req.files;
        const username = req.session.user.username;
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)
            return encoded_image = img.toString('base64')
        })





        const imgaddr = imgArray[0];
        const info = await usermodel.updateOne({ username: username }, { $set: { profilephoto: imgaddr } });
        res.redirect('/profile');
    } catch (error) {
        res.send(error);
    }

})

app.post("/updateuser", isAuth, async (req, res, next) => {
    try {
        const username = req.session.user.username;
        const Fname = req.body.Fname;
        const Lname = req.body.Lname;
        const phone = req.body.phone;
        const email = req.body.Email;
        const dob = req.body.dob;
        const pincode = req.body.pincode;

        const result = await usermodel.updateOne({ username: username }, { $set: { firstname: Fname, lastname: Lname, emailid: email, phone: phone, pincode: pincode, dob: dob } });


        res.redirect('/profile');
    } catch (error) {

    }
})


app.get("/discussion", async (req, res) => {
    const forumdetail = await forummodel.find().sort({ createdAt: -1 });

    const usr = req.session.user.username;
    const alldetail = await usermodel.find();

    alldetail.forEach(userelement => {
        forumdetail.forEach(forum => {
            if (userelement.username == forum.creator) {
                forum.forumsuerphoto = userelement.profilephoto;
            }
        });
    });
    forumdetail.forEach((element) => {
        element.fsincetime = moment(element.createdAt).fromNow();
    });




    res.render('discussion', {
        dusername: usr,
        forumdetail: forumdetail
    })
})

app.post('/newdiscussion', async (req, res) => {
    try {
        const forum = new forummodel({
            ftitle: req.body.ftitle,
            fcontent: req.body.fdescribe,
            creator: req.session.user.username,
        })
        await forum.save();
        res.redirect("/discussion");
    } catch (error) {
        res.send(error)
    }
})
app.get('/comments:did', async (req, res) => {
    const discussionid = req.params.did;
    const discussiondata = await forummodel.find({ _id: discussionid });
    discussiondata.forEach((element) => {
        element.fsincetime = moment(element.createdAt).fromNow();
    });
    const commentdata = await commentmodel.find({ discussionid: discussionid }).sort({ createdAt: -1 });
    commentdata.forEach((element) => {
        element.csincetime = moment(element.createdAt).fromNow();
    });

    const alldetail = await usermodel.find();
    const profilephoto = alldetail.find(ele => ele.username == req.session.user.username).profilephoto;
    discussiondata.forEach(disc => {
        alldetail.forEach(user => {
            if (user.username == disc.creator) {
                disc.forumsuerphoto = user.profilephoto;
            }
        });
    });

    alldetail.forEach(userelement => {
        commentdata.forEach(comment => {
            if (userelement.username == comment.cusername) {
                comment.commentuserphoto = userelement.profilephoto;
            }
        });
    });

    res.render('comment', {
        commentdata: commentdata, discussiondata: discussiondata, profilephoto: profilephoto
    })
})

app.post('/gotocomment', (req, res) => {

    res.redirect('/comments' + req.body.forumid);
})

app.post('/newcomment', async (req, res) => {
    try {
        const discid = req.body.discid;
        const comment = new commentmodel({
            discussionid: discid,
            ccontent: req.body.usercomment,
            cusername: req.session.user.username,
        })
        await comment.save();
        res.redirect('/comments' + discid);
    } catch (error) {
        res.send(error)
    }

})

app.post('/pincodechange', async (req, res) => {
    try {
        var uname = req.session.user.username;
        var userd = await usermodel.findOne({ 'username': uname });
        var pcode = userd.pincode;
        var currentpin = req.body.current_pincode;
        var profilephoto = userd.profilephoto;

        const mypostdata = await postmodel.find({ 'postpcode': currentpin }).sort({ 'createdAt': -1 });
        const postimg = await ImgageModel.find();
        // res.send(postdata);
        mypostdata.forEach((element) => {
            element.sincetime = moment(element.createdAt).fromNow();
        });


        // res.send(mysecondpostdata);
        res.render('feed',
            { postcontent: mypostdata, postimg: postimg, profilephoto: profilephoto, userd: userd, pcode: pcode, currentpin: currentpin, username: uname, dusername: uname }
        )


    } catch (error) {
        res.send(error);
    }

})

app.get('/pincodechange', async (req, res) => {
    try {
        var uname = req.session.user.username;
        var userd = await usermodel.findOne({ 'username': uname });
        var pcode = userd.pincode;
        var currentpin = req.body.current_pincode;
        var profilephoto = userd.profilephoto;

        const mypostdata = await postmodel.find({ 'postpcode': currentpin }).sort({ 'createdAt': -1 });
        const postimg = await ImgageModel.find();
        // res.send(postdata);
        mypostdata.forEach((element) => {
            element.sincetime = moment(element.createdAt).fromNow();
        });
        // res.send(mysecondpostdata);
        res.render('feed',
            { postcontent: mypostdata, postimg: postimg, profilephoto: profilephoto, userd: userd, pcode: pcode, currentpin: currentpin, username: uname, dusername: uname }
        )


    } catch (error) {
        res.send(error);
    }

})

app.post('/like', isAuth, async (req, res) => {

    try {

        const uname = req.session.user.username;

        const postdata = await postmodel.findById(req.body.postId);

        if (postdata.likes.includes(uname)) {

            postdata.likes.pull(uname)

        } else {

            postdata.likes.push(uname)

        }

        await postdata.save();

        res.redirect('/feed');

    } catch (error) {

        res.json(error)

    }

})





app.post('/report', isAuth, async (req, res) => {

    try {

        const uname = req.session.user.username;

        const post_data = await postmodel.findById(req.body.reportid);

        if (post_data.report.includes(uname)) {

            post_data.report.pull(uname)

        } else {

            post_data.report.push(uname)

        }

        await post_data.save();

        res.redirect('/feed');

    } catch (error) {

        // res.json(error);
        res.send("error in reports")

    }

})

app.get("/forgot-password", (req, res) => {



    res.render("forgot-password");



})



app.get("/reset-password", async (req, res, next) => {

    try {

        const user = await usermodel.findOne({ resetString: req.query.token });

        const userreset = user.resetString;


        if (!user) {

            return res.redirect('/login');

        }

        localStorage.setItem("userresetstring", userreset);

        return res.render("reset-password");

    } catch (error) {

        res.redirect('/');

    }

})

app.post("/forgot-password", async (req, res, next) => {



    const emailid = req.body.emailid;



    const useremailid = await usermodel.findOne({ emailid: emailid });



    try {

        if (!useremailid) {

            return res.redirect('/login');

        }



        useremailid.resetString = crypto.randomBytes(64).toString('hex');



        await useremailid.save();

    } catch (error) {

        console.log(error);

        res.redirect('/login');

    }



    const msg = {



        from: 'vitminiproj@gmail.com',



        to: useremailid.emailid,



        subject: 'Localiyo - Reset Password',



        text: `



        Hello, We Heard That You Lost The Password Of Your Account.



        Don't Worry, Use The Link Below To Reset It :



        http://${req.headers.host}/reset-password?token=${useremailid.resetString}



        `,



        html: `

        <h1>Localiyo</h1>

        <p>Hello, We Heard That You Lost The Password Of Your Account.</p>

        <p>Don't Worry, Use The Link Below To Reset It :</p>

        <a href = "http://${req.headers.host}/reset-password?token=${useremailid.resetString}">Reset Your Password By Clicking Here</a>

        `

    }



    try {

        await sgMail.send(msg);

        res.redirect('/login');

    } catch (error) {

        console.log(error);

        res.redirect('/login')

    }

})

app.post('/reset-password', async (req, res) => {

    try {

        const usertoken = localStorage.getItem("userresetstring");

        const users = await usermodel.findOne({ resetString: usertoken });

        const newpassword = req.body.newpassword;

        const confirmpassword = req.body.confirmpassword;

        if (newpassword !== confirmpassword) {

            res.redirect('/login');

        }

        users.password = confirmpassword;

        users.resetString = null;
        // users.resetExpires = undefined;
        await users.save();
        res.redirect('/login')
    } catch (error) {
        // console.log(error);
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`server started at port no ${port}`);
})