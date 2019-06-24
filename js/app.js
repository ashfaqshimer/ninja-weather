const form = document.querySelector('#cityForm');
const displaySection = document.querySelector('#displayWeather');
const details = document.querySelector('.card-body');
const timeImg = document.querySelector('img.time');
const iconImg = document.querySelector('.icon > img');

const updateUI = data => {
	// Object Destructuring
	const { cityDetails, weather } = data;

	// Update weather details
	details.innerHTML = `
    <h3 class="card-title">${cityDetails.EnglishName}</h3>
    <div class="card-text">
        <h5>${weather.WeatherText}</h5>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;

	// Update Icon
	const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
	iconImg.setAttribute('src', iconSrc);

	// Update Night/Day Img
	let weatherImg = weather.IsDayTime ? './img/day.svg' : './img/night.svg';

	timeImg.setAttribute('src', weatherImg);

	if (displaySection.classList.contains('d-none')) {
		displaySection.classList.remove('d-none');
	}
};

const updateCity = async city => {
	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);
	return { cityDetails, weather };
};

form.addEventListener('submit', event => {
	event.preventDefault();

	const city = form.city.value.trim();
	form.reset();

	updateCity(city)
		.then(data => {
			console.log(data);
			updateUI(data);
		})
		.catch(err => console.log(err));
});
