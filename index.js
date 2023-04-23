console.log("This is my index js file");

// Initialize the news api parameters
// let source = "the-times-of-india";
let apiKey = "6940012ce8954f84b95e6ad72f7b0dee";

// Grab the news container
let newsAccordion = document.getElementById("newsAccordion");

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,
    true
);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">

                                <button class="btn btn-link collapsed float-right" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                aria-expanded="false" 
                                aria-controls="collapse${index}">

                                    <div class="news-img float-left ">
                                        <img id="newsImg" src=" ${element["urlToImage"]}" >
                                    </div>

                                    <b> ${index + 1}:</b> ${element["title"]}
                                    
                                </button>
                                                       
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element["url"] }" target="_blank" >Read more here</a>    
                                </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        console.log("Some error occured");
    }
};

xhr.send();

// -----*********************************************************************************************************************************************************************

//making object of weatherapi
const weatherApi = {
    key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})


//get waether report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport);  // calling showweatherreport function

}

//show weather report

function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{

    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}



//making a function for the  last update current time 

function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//date manage for return  current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(year+" "+date+" "+day+" "+month);
    return `${date} ${month} (${day}) , ${year}`
}

// function for the dynamic background change  according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(img/clear.jpg)';
    }
    else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(img/snow.jpg)';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(img/mist.jpg)';
    }

    else {
        document.body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}

//making a function for the classname of icon
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// // Variables
// const generalBtn = document.getElementById("general");
// const businessBtn = document.getElementById("business");
// const sportsBtn = document.getElementById("sports");
// const entertainmentBtn = document.getElementById("entertainment");
// const technologyBtn = document.getElementById("technology");
// const searchBtn = document.getElementById("searchBtn");

// const newsQuery = document.getElementById("newsQuery");
// const newsType = document.getElementById("newsType");
// const newsdetails = document.getElementById("newsdetails");

// // Array
// var newsDataArr=[];

// // APIs
// const API_KEY = "6940012ce8954f84b95e6ad72f7b0dee";

// const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=6940012ce8954f84b95e6ad72f7b0dee";
// const SEARCH_NEWS = " https://newsapi.org/v2/everything?q=bitcoin&apiKey=6940012ce8954f84b95e6ad72f7b0dee";

// window.onload = function(){
//     newsType.innerHTML = "<h4>Headlines</h4>";
//     fetchHeadlines();
// };

// generalBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>General news</h4>";
//     fetchGeneralNews();
// });
// businessBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>Business</h4>";
//     fetchBusinessNews();
// });
// sportsBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>Sports</h4>";
//     fetchSportsNews();
// });
// entertainmentBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>Entertainment</h4>";
//     fetchEntertainmentNews();
// });
// technologyBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>Technolgy</h4>";
//     fetchTechnologyNews();
// });
// searchBtn.addEventListener("click", function(){
//     newsType.innerHTML = "<h4>Search : "+newsQuery.value+"</h4>";
//     fetchQueryNews();
// });

// const fetchHeadlines = async () => {
//     const response = await fetch(HEADLINES_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }

// const fetchGeneralNews = async () => {
//     const response = await fetch(GENERAL_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }
// const fetchBusinessNews = async () => {
//     const response = await fetch(BUSINESS_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }
// const fetchSportsNews = async () => {
//     const response = await fetch(SPORTS_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }
// const fetchEntertainmentNews = async () => {
//     const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         console.log(myJson);
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }
// const fetchTechnologyNews = async () => {
//     const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }

// const fetchQueryNews = async () => {

//     if(newsQuery.value == null){
//         return;
//     }

//     const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey=" + API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status <300){
//         const myjson = await response.json();
//         newsDataArr = myJson.articles;
//     }else {
//         // handle errors
//         console.log(response.status,response.statusText);
//     }
//     displayNews();
// }

// function displayNews(){

//     newsdetails.innerHTML = "";

//     if(newsDataArr.length == 0 ){
//         newsdetails.innerHTML="<h5>No data found.</h5>"
//         return;
//     }

//     newsDataArr.forEach(news =>{

//         var date =  news.publishedAt.split("T")
//         var col = document.createElement('div');
//         col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

//         var card = document.createElement("div");
//         card.className = "p-2";

//         var image = document.createElement('img');
//         image.setAttribute("height", "matchparnt");
//         image.setAttributes("width", "100%");
//         image.src = news.urlToImage;

//         var cardBody = document.createElement('div');

//         var newsHeading = document.createElement('h5');
//         newsHeading.className = 'card-title';
//         newsHeading.innerHTML = news.title;

//         var dateHeading = document.createElement("h6");
//         dateHeading.className = "text-primary";
//         dateHeading.innerHTML = date[0];

//         var discription = document.createElement("p");
//         discription.className = "text-muted";
//         discription.innerHTML = news.description;

//         var link = document.createElement('a');
//         link.className ="btn btn-dark";
//         link.setAttribute("target", "_blank");
//         link.href = news.url;
//         link.innerHTML = "Read more";

//         cardBody.appendChild(newsHeading);
//         cardBody.appendChild(dateHeading);
//         cardBody.appendChild(discription);
//         cardBody.appendChild(link);

//         card.appendChild(image);
//         card.appendChild(cardBody);

//         col.appendChild(card);

//         newsdetails.appendChild(col);
//     });

// }
