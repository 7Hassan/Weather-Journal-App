// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


/* Global Variables */
let buttom = document.getElementById("generate");
let tempDev = document.getElementById("temp");
let weatherDiv = document.getElementById("Weather");
let contentDiv = document.getElementById("content");
let nameDiv = document.getElementById("name");
let dateDiv = document.getElementById("date");
let outputBox = document.querySelector(".entry");
let errorSpan = document.getElementById("error");



// Api url
const rootUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// personal apikey
const apiKey = '&appid=57627dfa1c87ec92321f2953650f99c2&units=metric';




// onclick buttom or Enter
buttom.addEventListener('click', clickButtom);
document.getElementById("zip").addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        clickButtom();
    }
});




// fumction after click buttom
function clickButtom() {
    let cityName = document.getElementById("zip").value;
    fetch(rootUrl + cityName + apiKey).then((res) => {
        return res.json();
    }).then((res) => {
        addDataToPage(res);
        addIcone(res);
    }).catch((error) => {
        errorSpan.style.height = "25px";
        errorSpan.textContent = "Not found";
        console.log(error);
    })
}




function addDataToPage(ele) {
    tempDev.innerHTML = Math.round(+ele.main.temp) + "&degc";
    weatherDiv.innerHTML = ele.weather[0].description;
    nameDiv.innerHTML = ele.name;
    dateDiv.innerHTML = newDate;
    outputBox.style.opacity = "1";
    errorSpan.style.height = "0px";
    errorSpan.textContent = "";
}

function addIcone(ele) {
    let weather = ele.weather[0].description;
    if (weather.indexOf("clouds") !== -1 && weather.indexOf("rain") === -1) {
        contentDiv.innerHTML = '<i class="fa-solid fa-cloud"></i>';
        contentDiv.style.color = 'white';
    } else if (weather.indexOf("rain") !== -1) {
        contentDiv.innerHTML = '<i class="fa-sharp fa-solid fa-cloud-rain"></i>';
        contentDiv.style.color = 'rgb(40, 73, 109)';
    } else if (weather.indexOf("clear") !== -1) {
        contentDiv.innerHTML = '<i class="fa-solid fa-sun"></i>';
        contentDiv.style.color = 'rgb(255, 165, 0)';
    } else if (weather.indexOf("mist") !== -1 || weather.indexOf("fog") !== -1) {
        contentDiv.innerHTML = '<i class="fa-solid fa-smog"></i>';
        contentDiv.style.color = 'white';
    } else {
        contentDiv.innerHTML = "";
    }
}