// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() +'-'+ d.getMonth()+'-'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiID = '5fad3e06fe7101b02a7944c04bc40f8b';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', eventlistner);

/* Function called by event listener */
function eventlistner(event) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if(zip.length == 5){
        getWeather(baseURL, zip, apiID)
        .then(function(usrdata) {
            postData('/apiadd', {date: newDate, temp: usrdata.main.temp, feelings })
        }).then(function (result) {
            // call updateUI to update browser content
            updateUI()
        })

    }else{
        alert("please add 5 digit zip code")
    }

};

/* Function to GET Web API Data */
const getWeather = async (baseURL, zip, apiID) => {
    const response  = await fetch(baseURL + zip + '&appid=' + apiID + '&units=imperial');
    try {
        const usrdata = await response.json();
        return usrdata;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            feelings: data.feelings
        })
    })

    try {
        const result = await response.json();
        return result;
    } catch(error) {
        console.log('error', error);
    }
};

/* To updateUI */
const updateUI = async() => {
    const request = await fetch('/apiall');
    try {
        const updateData = await request.json();
        document.getElementById('date').innerHTML ='Date: ' + updateData.date;
        document.getElementById('temp').innerHTML = 'Temp: ' + updateData.temp + ' F';
        document.getElementById('content').innerHTML = 'Feelings: ' + updateData.feelings;
    } catch(error) {
        console.log('error', error);
    }
};