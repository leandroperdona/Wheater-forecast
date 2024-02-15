 document.querySelector ('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert ('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = 'b6e07ffd3e265dc557f18fd3dd7dc845'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json()
    
    if(json.cod === 200) {
        showInfo({
          city: json.name,
          country: json.sys.country,
          temp: Math.round (json.main.temp),
          tempMax: Math.round(json.main.temp_max),
          tempMin: Math.round(json.main.temp_min),
          description: json.weather[0].description,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
        });

    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
        Não foi possível localizar...

        <img src="src/img/404.svg.svg"/>
        `)
    }

 }); 

 function showInfo(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    
    document.querySelector('#temp_value').innerHTML =`${json.temp}<sup>°C</sup>`
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax} <sup>°C</sup>`
    document.querySelector('#temp_min').innerHTML = `${json.tempMin} <sup>°C</sup>`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}Km/h`;
 }

 function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
 
 }
 