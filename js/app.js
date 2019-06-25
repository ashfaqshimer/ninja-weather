const form = document.querySelector('#cityForm');
const displaySection = document.querySelector('#displayWeather');
const details = document.querySelector('.card-body');
const timeImg = document.querySelector('img.time');
const iconImg = document.querySelector('.icon > img');

const forecast = new Forecast();

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
	scrollTo(0, 1000);
};

form.addEventListener('submit', event => {
	event.preventDefault();
	const city = form.city.value.trim();
	form.reset();

	forecast
		.updateCity(city)
		.then(data => {
			updateUI(data);
		})
		.catch(err => console.log(err));

	// Set Local Storage
	localStorage.setItem('city', city);
});

// Check if the city is saved in local storage
if (localStorage.getItem('city')) {
	forecast
		.updateCity(localStorage.getItem('city'))
		.then(data => {
			updateUI(data);
		})
		.catch(err => {
			console.log(err);
		});
}
