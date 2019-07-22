class Forecast{
    constructor(){
        this.key = '5OQJFkAvVhtqOkaQEOT5h0austbGMBYS';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        return {
            cityDetails: cityDetails, //const equal object property
            weather: weather
        };
    }
    // get city information
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return (data[0]); // closest match
    }
    //get weather information
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    }
};

// first get cuty then data weather via data.Key then log the data
/* 
getCity('miami').then(data => {
    return getWeather(data.Key);
}).then(data => {
    console.log(data)
})
.catch(err => console.log(err));
*/

