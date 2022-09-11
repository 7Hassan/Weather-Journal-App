


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


/* Global Variables */
let buttom=document.getElementById("generate");
// Api url
const rootUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
// personal apikey
const apiKey=',&appid=57627dfa1c87ec92321f2953650f99c2&units=metric';
const server="http://127.0.0.1:3000";

// onclick buttom
buttom.addEventListener('click',clickButtom);



// fumction after click buttom
function clickButtom (){
    let zipInput=document.getElementById("zip").value;
    let feelingText=document.getElementById("feelings").value;
    getWeather(rootUrl,zipInput,apiKey).then(
        (data)=>{
                data={
                    temp:Math.round(+data.main.temp),
                    weather:data.weather[0].description,
                    name:data.name,
                    date:newDate,
                    feeling:feelingText,
                }
        postData(`${server}/add`,data);
        showData();
    });
};





// to get data from website openweathermap
getWeather=async (url,zip,apiKey)=>{
    const res=await fetch(url+zip+apiKey)
    try{
        const data=await res.json();
        if (data.cod!==200) {
            console.log(data.message);
           
        }else{
            console.log("sucsses");
           
        }
        return data;

        
    }
    catch(error){
        console.log("error",error);
    }
}

// post data in server
const postData= async(url='',data={})=>{
    
    const response=await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
    });
    try{
     const newData=await response.json();
    return newData;
    }catch(error){
        console.log("error",error);
    }
}

// show data in page
const showData=async ()=>{
    const req=await fetch(`${server}/all`);
    try{
        const reqData=await req.json();
        console.log(reqData);
        document.getElementById("temp").innerHTML=reqData.temp + '&degC';
        document.getElementById("Weather").innerHTML=reqData.weather;
        document.getElementById("content").innerHTML=reqData.feeling;
        document.getElementById("name").innerHTML=reqData.name;
        document.getElementById("date").innerHTML=reqData.date;
    }catch(error){
        console.log("error",error);
    }
}

