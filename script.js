const apiKey = '9d9aeae51a5be98eb6d245c5b8b8622a'
const units = 'metric'
const lang = 'pt_br'

function searchWeather(searchTerm) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${apiKey}&units=${units}&lang=${lang}`

    fetch(url).then((result) => {
        return result.json()
    })
    .then(result => {init(result)})
}

function init(resultFromServer){
    let weatherStatus = document.querySelector('.weatherStatus')
    let temperature = document.querySelector('.temperature')
    let cityTitle = document.querySelector('.cityTitle')
    let weatherIcon = document.querySelector('.statusIconImg')

    weatherIcon.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${resultFromServer.weather[0].icon}.svg`
    
    let resultDescription = resultFromServer.weather[0].description
    weatherStatus.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '°'
    cityTitle.innerHTML = resultFromServer.name
    
    function setPositionForWeatherInfo() {
        let weatherContainer = document.querySelector('.weatherContainer');
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;
    
        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
        weatherContainer.style.visibility = 'visible';
    }

    setPositionForWeatherInfo()
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('inputCity').value

    if(searchTerm){searchWeather(searchTerm)}
})
