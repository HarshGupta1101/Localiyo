console.log("This is my index js file");

// Initialize the news api parameters
// let source = 'the-times-of-india';
let apiKey = '755d80a9fd7245ca80212a1b8f11d964';

// let scroll_up = document.getElementById("scroll-up");
// scroll_up.onclick = function (){
//     window.scrollTo(0,0);
// }

let scroll_up = document.getElementById("scroll-up");

window.addEventListener("scroll",function (){

 if(this.window.pageYOffset > 40){

 scroll_up.style.display = "block";

 }

 else{

 scroll_up.style.display = "none";

 }

})


scroll_up.onclick = function (){

 window.scrollTo(0,0);

}

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion0');
let newsAccordion1 = document.getElementById('newsAccordion1');
let newsAccordion2 = document.getElementById('newsAccordion2');
let newsAccordion3 = document.getElementById('newsAccordion3');
let newsAccordion4 = document.getElementById('newsAccordion4');
let newsAccordion5 = document.getElementById('newsAccordion5');
let newsAccordion6 = document.getElementById('newsAccordion6');
let newsAccordion7 = document.getElementById('newsAccordion7');

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            let news = `<div class="news-card">
                    <div class="news-img">
                            <img src="${element["urlToImage"]}" />
                        </div>
                        <div class="card-header" id="heading${index}">
                            <h2>
                                <button class="btn" type="button">
                                    ${element["title"]}
                                </button>
                        </h2>
                    </div>
                    <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                    </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }

}

xhr.send()

const xhr1 = new XMLHttpRequest();
xhr1.open('GET', `https://newsapi.org/v2/everything?q=covid&language=en&sortBy=publishedAt&apiKey=${apiKey}`, true);
xhr1.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml1 = "";
        articles.forEach(function (element, index) {
            let news1 = `<div class="news-card">
                    <div class="news-img">
                        <img src="${element["urlToImage"]}" />
                    </div>
                    <div class="card-header" id="heading${index}">
                        <h2>
                        <button class="btn" type="button">
                            ${element["title"]}
                        </button>
                        </h2>
                    </div>
                    <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                </div>`;
            newsHtml1 += news1;
        });
        newsAccordion1.innerHTML = newsHtml1;
    }
    else {
        console.log("Some error occured")
    }
}

xhr1.send();

const xhr2 = new XMLHttpRequest();
xhr2.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`, true);
xhr2.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml2 = "";
        articles.forEach(function (element, index) {
            let news2 = `<div class="news-card">
                    <div class="news-img">
                        <img src="${element["urlToImage"]}" />
                    </div>
                    <div class="card-header" id="heading${index}">
                        <h2>
                        <button class="btn" type="button">
                           ${element["title"]}
                        </button>
                        </h2>
                    </div>
                    <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                </div>`;
            newsHtml2 += news2;
        });
        newsAccordion2.innerHTML = newsHtml2;
    }
    else {
        console.log("Some error occured")
    }

}

xhr2.send();

const xhr3 = new XMLHttpRequest();
xhr3.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${apiKey}`, true);

xhr3.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml3 = "";
        articles.forEach(function (element, index) {
            let news3 = `<div class="news-card">
                            <div class="news-img">
                                <img src="${element["urlToImage"]}" />
                            </div>
                            <div class="card-header" id="heading${index}">
                                <h2>
                                <button class="btn" type="button">
                                   ${element["title"]}
                                </button>
                                </h2>
                            </div>
                            <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                        </div>`;
            newsHtml3 += news3;
        });
        newsAccordion3.innerHTML = newsHtml3;
    }
    else {
        console.log("Some error occured")
    }
}

xhr3.send();

const xhr4 = new XMLHttpRequest();
xhr4.open('GET', `https://newsapi.org/v2/everything?q=politics&language=en&sortBy=publishedAt&apiKey=${apiKey}`, true);

xhr4.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml4 = "";
        articles.forEach(function (element, index) {
            let news4 = `<div class="news-card">
                            <div class="news-img">
                                <img src="${element["urlToImage"]}" />
                            </div>
                            <div class="card-header" id="heading${index}">
                                <h2>
                                <button class="btn" type="button">
                                   ${element["title"]}
                                </button>
                                </h2>
                            </div>
                            <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                        </div>`;
            newsHtml4 += news4;
        });
        newsAccordion4.innerHTML = newsHtml4;
    }
    else {
        console.log("Some error occured")
    }
}

xhr4.send();

const xhr5 = new XMLHttpRequest();
xhr5.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`, true);

xhr5.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml5 = "";
        articles.forEach(function (element, index) {
            let news5 = `<div class="news-card">
                            <div class="news-img">
                                <img src="${element["urlToImage"]}" />
                            </div>
                            <div class="card-header" id="heading${index}">
                                <h2>
                                <button class="btn" type="button">
                                  ${element["title"]}
                                </button>
                                </h2>
                            </div>
                            <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                        </div>`;
            newsHtml5 += news5;
        });
        newsAccordion5.innerHTML = newsHtml5;
    }
    else {
        console.log("Some error occured")
    }
}

xhr5.send();

const xhr6 = new XMLHttpRequest();
xhr6.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${apiKey}`, true);

xhr6.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml6 = "";
        articles.forEach(function (element, index) {
            let news6 = `<div class="news-card">
                            <div class="news-img">
                                <img src="${element["urlToImage"]}" />
                            </div>
                            <div class="card-header" id="heading${index}">
                                <h2>
                                <button class="btn" type="button">
                                   ${element["title"]}
                                </button>
                                </h2>
                            </div>
                            <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                        </div>`;
            newsHtml6 += news6;
        });
        newsAccordion6.innerHTML = newsHtml6;
    }
    else {
        console.log("Some error occured")
    }
}

xhr6.send();

const xhr7 = new XMLHttpRequest();
xhr7.open('GET', `https://newsapi.org/v2/everything?q=meteorology&language=en&sortBy=publishedAt&apiKey=${apiKey}`, true);

xhr7.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml7 = "";
        articles.forEach(function (element, index) {
            let news7 = `<div class="news-card">
                            <div class="news-img">
                                <img src="${element["urlToImage"]}" />
                            </div>
                            <div class="card-header" id="heading${index}">
                                <h2>
                                <button class="btn" type="button">
                                     ${element["title"]}
                                </button>
                                </h2>
                            </div>
                            <div class="read-more"><a href="${element['url']}" target="_blank"><h4>Read More...</h4></a></div>
                        </div>`;
            newsHtml7 += news7;
        });
        newsAccordion7.innerHTML = newsHtml7;
    }
    else {
        console.log("Some error occured")
    }
}

xhr7.send();

function right_click(count, accor) {
    if (count < 7 && count >= 1) {
        let translate = -count * 5;
        count += 1;
        accor.style.transform = `translateX(${translate}%)`;
    }
    return count;
}

function left_click(count, accor) {
    if (count <= 7 && count >= 1) {
        let translate = -count * 5 + 5;
        if (count != 1) {
            count -= 1;
        }
        accor.style.transform = `translateX(${translate}%)`;
    }
    return count;
}

let c = 1;

let rb = document.getElementById("tp0-right");
let lb = document.getElementById("tp0-left");
let newsAcc = document.getElementById("newsAccordion0");

rb.onclick = function () {
    c = right_click(c, newsAcc);
}

lb.onclick = function () {
    c = left_click(c, newsAcc);
}

let count1 = 1;

let rb1 = document.getElementById("tp1-right");
let lb1 = document.getElementById("tp1-left");
let newsAcc1 = document.getElementById("newsAccordion1");

rb1.onclick = function () {
    count1 = right_click(count1, newsAcc1);
}

lb1.onclick = function () {
    count1 = left_click(count1, newsAcc1);
}

let count2 = 1;

let rb2 = document.getElementById("tp2-right");
let lb2 = document.getElementById("tp2-left");
let newsAcc2 = document.getElementById("newsAccordion2");

rb2.onclick = function () {
    count2 = right_click(count2, newsAcc2);
}

lb2.onclick = function () {
    count2 = left_click(count2, newsAcc2);
}

let count3 = 1;

let rb3 = document.getElementById("tp3-right");
let lb3 = document.getElementById("tp3-left");
let newsAcc3 = document.getElementById("newsAccordion3");

rb3.onclick = function () {
    count3 = right_click(count3, newsAcc3);
}

lb3.onclick = function () {
    count3 = left_click(count3, newsAcc3);
}

let count4 = 1;

let rb4 = document.getElementById("tp4-right");
let lb4 = document.getElementById("tp4-left");
let newsAcc4 = document.getElementById("newsAccordion4");

rb4.onclick = function () {
    count4 = right_click(count4, newsAcc4);
}

lb4.onclick = function () {
    count4 = left_click(count4, newsAcc4);
}

let count5 = 1;

let rb5 = document.getElementById("tp5-right");
let lb5 = document.getElementById("tp5-left");
let newsAcc5 = document.getElementById("newsAccordion5");

rb5.onclick = function () {
    count5 = right_click(count5, newsAcc5);
}

lb5.onclick = function () {
    count5 = left_click(count5, newsAcc5);
}

let count6 = 1;

let rb6 = document.getElementById("tp6-right");
let lb6 = document.getElementById("tp6-left");
let newsAcc6 = document.getElementById("newsAccordion6");

rb6.onclick = function () {
    count6 = right_click(count6, newsAcc6);
}

lb6.onclick = function () {
    count6 = left_click(count6, newsAcc6);
}

let count7 = 1;

let rb7 = document.getElementById("tp7-right");
let lb7 = document.getElementById("tp7-left");
let newsAcc7 = document.getElementById("newsAccordion7");

rb7.onclick = function () {
    count7 = right_click(count7, newsAcc7);
}

lb7.onclick = function () {
    count7 = left_click(count7, newsAcc7);
}

let categories = document.getElementById("categories");
let cate_close = document.getElementById("cate-close");
let hamburger = document.getElementById("hamburger");

hamburger.onclick = function (){
    categories.style.transform = "translateX(0vw)";
    this.style.visibility = "hidden";
    hamburger.style.transitionDelay = "0s";
}

cate_close.onclick = function (){
    categories.style.transform = "translateX(-20vw)";
    hamburger.style.visibility = "visible";
    hamburger.style.transitionDelay = "1s";
}

let cate_all = document.getElementById("cate-all");
let cate_corona = document.getElementById("cate-corona");
let cate_business = document.getElementById("cate-business");
let cate_entertainment = document.getElementById("cate-entertainment");
let cate_politics = document.getElementById("cate-politics");
let cate_sports = document.getElementById("cate-sports");
let cate_tecgnology = document.getElementById("cate-technology");
let cate_weather = document.getElementById("cate-weather");

let see_all = document.getElementById("see-all0");
let see_all1 = document.getElementById("see-all1");
let see_all2 = document.getElementById("see-all2");
let see_all3 = document.getElementById("see-all3");
let see_all4 = document.getElementById("see-all4");
let see_all5 = document.getElementById("see-all5");
let see_all6 = document.getElementById("see-all6");
let see_all7 = document.getElementById("see-all7");
let back_arrow = document.getElementById("back-arrow");
let accordion = document.getElementsByClassName("accordion");

const accord = ['news0','news1','news2','news3','news4','news5','news6','news7'];

cate_all.onclick = function (){
    hamburger_categories(0);
}

cate_corona.onclick = function (){
    hamburger_categories(1);
}

cate_business.onclick = function (){
    hamburger_categories(2);
}

cate_entertainment.onclick = function (){
    hamburger_categories(3);
}

cate_politics.onclick = function (){
    hamburger_categories(4);
}

cate_sports.onclick = function (){
    hamburger_categories(5);
}

cate_tecgnology.onclick = function (){
    hamburger_categories(6);
}

cate_weather.onclick = function (){
    hamburger_categories(7);
}

function hamburger_categories (number){
    accord.forEach(displaynone);
    category_news(number);
    categories.style.transform = "translateX(-20vw)";
    hamburger.style.visibility = "visible";
    hamburger.style.transitionDelay = "1s";
}

see_all.onclick = function (){
    accord.forEach(displaynone);
    category_news(0);
}

see_all1.onclick = function (){
    accord.forEach(displaynone);
    category_news(1);
}

see_all2.onclick = function (){
    accord.forEach(displaynone);
    category_news(2);
}

see_all3.onclick = function (){
    accord.forEach(displaynone);
    category_news(3);
}

see_all4.onclick = function (){
    accord.forEach(displaynone);
    category_news(4);
}

see_all5.onclick = function (){
    accord.forEach(displaynone);
    category_news(5);
}

see_all6.onclick = function (){
    accord.forEach(displaynone);
    category_news(6);
}

see_all7.onclick = function (){
    accord.forEach(displaynone);
    category_news(7);
}

function displaynone(item){
    document.getElementById(item).style.display = "none";
}

function category_news(number){
    document.getElementById(`news${number}`).style.display = "grid";
    document.getElementById(`news${number}`).style.position = "relative";
    document.getElementById(`newsAccordion${number}`).className = `newaccordion`;
    document.getElementById(`display${number}`).className = "newdisplay";
    let cate_head1 = document.getElementById(`cate-head${number}`);
    cate_head1.style.marginTop = '18vh';
    hamburger.style.display = 'none';
    back_arrow.style.display = "block";
    window.scrollTo(0,0);
    document.getElementById(`tp${number}-left`).style.display = "none";
    document.getElementById(`tp${number}-right`).style.display = "none";
    document.getElementById(`see-all${number}`).style.display = 'none';
}

back_arrow.onclick = function (){
    hamburger.style.display = 'flex';
    back_arrow.style.display = "none";
    window.scrollTo(0,0);
    for(let number=0;number<=7;number++){
        document.getElementById(`news${number}`).style.display = "inline";
        document.getElementById(`news${number}`).style.position = "static";
        document.getElementById(`tp${number}-left`).style.display = "flex";
        document.getElementById(`tp${number}-right`).style.display = "flex";
        document.getElementById(`cate-head${number}`).style.marginTop = "0vh";
        document.getElementById(`see-all${number}`).style.display = 'flex';
        document.getElementById(`newsAccordion${number}`).className = `accordion`;
        document.getElementById(`display${number}`).className = `display`;
    }
    let cate_head1 = document.getElementById(`cate-head0`);
    cate_head1.style.marginTop = '15vh';
    accord.forEach(displayflex);
}

function displayflex(item){
    document.getElementById(item).style.display = "block"; 
    document.getElementById(item).style.position = "static";
}