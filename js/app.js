const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails, //const equal object property
        weather: weather
    };
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

const updateUI = (data) => {

    console.log(data);

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructure properties
    const { cityDetails, weather } = data;

    // update template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update night/day & icon images

    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon  .setAttribute('src', iconSource);

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    /* if(weather.IsDayTime){
        timeSource = 'img/day.svg';
    } else {
        timeSource = 'img/night.svg';
    } */
    time.setAttribute('src', timeSource);

    // remove d-none class 
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};