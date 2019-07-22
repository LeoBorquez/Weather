const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
// calling Forecast class
const forecast = new Forecast();


cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // local storage
    localStorage.setItem('city', city);
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

// if city in local storage exist
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}