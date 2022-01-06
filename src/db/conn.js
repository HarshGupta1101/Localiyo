const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
    process.env.MONGO_URI,{useNewUrlParser: true,}
).then(() => console.log("Connection Established!"))
.catch((err) => {
    console.log(err);
});
