class Forecast {
	constructor() {
		this.key = 'olE20VlZViNghN07nBuvHcsKk4flVSM3';
		this.weatherURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
		this.cityURL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	}

	async updateCity(city) {
		const cityDetails = await this.getCity(city);
		const weather = await this.getWeather(cityDetails.Key);

		return { cityDetails, weather };
	}

	async getCity(city) {
		const param = `?apikey=${this.key}&q=${city}`;
		const response = await fetch(this.cityURL + param);
		const data = await response.json();

		return data[0];
	}

	async getWeather(id) {
		const param = `${id}?apikey=${this.key}`;
		const response = await fetch(this.weatherURL + param);
		const data = await response.json();

		return data[0];
	}
}
