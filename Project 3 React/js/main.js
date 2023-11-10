const API_KEY = '4c353af824d786d3afe3b55e6a4178eb';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;


const DAYS_URL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&units=metric`

function searchCity() {
    
    const cityName = document.getElementById('search').value;
    
    if(cityName){
       console.log(cityName);
        axios.get(BASE_URL+`&q=${cityName}`)
        .then(function (res) {
            //console.log(res); 
                       
            generateCards(res.data);            
        })
    }  
           
}


function generateCards(results){
    const ICON_URL = `https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`

    let html = `<div class="list">`

    html = html + `
    <span class="country">${results.sys.country},</span>
    <span class="city_name">${results.name}</span> </br> 
    <span class="description">${results.weather[0].description}</span> </br>    
    <img src="${ICON_URL}" class="icon"></img> </br>
    <span class="temp">${results.main.temp} °C</span> </br>         
    <span class="speed">wind speed:  ${results.wind.speed} m/s</span>    
    `
    
    html = html + '</div>'
    document.getElementById('content').innerHTML = html;    
}

function searchDaysCity() {
    
    const cityName = document.getElementById('search').value;

    if(cityName){
       console.log(cityName);
        axios.get(DAYS_URL+`&q=${cityName}`)
        .then(function (res) {
            //console.log(res.data);
           
               
            generateDaysCards(res.data)                     
        })        
    }           
}

function generateDaysCards(resultData){
        
    let html = `<ul class="day_list">`

    resultData.list.forEach(el => {
        const ICON_DAY_URL = `https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ];
          let dateList = new Date(el.dt_txt);
          let dateNumber = dateList.getDay();
        //console.log(days[dateNumber]);
      

        html = html + `
        <li class='day_list_item'>
            <span class="days">${days[dateNumber]},</span></br> 
            <span class="txt">${el.dt_txt},</span></br> 
            <span class="temp">${el.main.temp} °C</span></br> 
            <img src="${ICON_DAY_URL}" ></br
            <span class="description">${el.weather[0].description}</span></br>   
            <span class="wind">${el.wind.speed} m/s</span></br>
        </li>`
        
        
    })
    
    
    
    html = html + '</ul>'
    document.getElementById('day_content').innerHTML = html;    
}
