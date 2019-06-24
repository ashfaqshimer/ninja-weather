const key = 'olE20VlZViNghN07nBuvHcsKk4flVSM3';

const getCity = async city => {
	const url = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	const param = `?apikey=${key}&q=${city}`;

	const response = await fetch(url + param);
	const data = await response.json();

	return data[0];
};

const getWeather = async id => {
	const url = 'https://dataservice.accuweather.com/currentconditions/v1/';
	const param = `${id}?apikey=${key}`;

	const response = await fetch(url + param);
	const data = await response.json();

	return data[0];
};

// Testing with dummy data

// getCity('Colombo')
// 	.then(data => {
// 		return getWeather(data.Key);
// 	})
// 	.then(weatherInfo => {
// 		console.log(weatherInfo);
// 	})
// 	.catch(err => console.log(err));
