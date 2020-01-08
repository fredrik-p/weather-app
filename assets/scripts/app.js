/**
 * ☔️.
 *
 */

//const icon = document.querySelector('.icon img');

const renderAlert = (severity, msg) => {
    document.querySelector('#forecast').innerHTML =
        `<div class="alert alert-${severity}" role="alert">${msg}</div>`;
};

const renderCurrentWeather = data => {
    const template = `
		<div class="card">
            <img src="assets/images/forecast-banner.png" class="time card-img-top">
            <div class"icon bg.light mx-auto text-center>
                <img src="" alt="">
			<div class="card-body">
                <h5 class="card-title" id="city">${data.name}, <span id="country">${data.sys.country}</span></h5>
                <p class="cond">
                <span id="condition">${data.weather[0].main}</span>
            </p>
				<p class="temp">
					<span id="temperature">${data.main.temp}</span>
					&deg;C
                </p>
                
                <p class="humid">
					<span id="humidity">${data.main.humidity}</span>
					&percnt;
				</p>

				<p class="wind">
					<span id="windspeed">${data.wind.speed}</span>
					m/s
				</p>
			</div>
		</div>
	`;

    document.querySelector('#forecast').innerHTML = template;

    const time = document.querySelector('img.time');

    var ts = Math.round((new Date()).getTime() / 1000);

    let timeSrc = null;

    if (ts > data.sys.sunrise && ts < data.sys.sunset) {
        timeSrc = 'assets/images/day.svg';
    } else {
        timeSrc = 'assets/images/night.svg';
    }
    time.setAttribute('src', timeSrc);
};



document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();

    const city = document.querySelector('#query').value;

    if (city.length < 2) {
        return;
    }

    getCurrentWeather(city)
        .then(data => {
            if (data.cod === 200) {
                renderCurrentWeather(data);
            } else {
                // show what went wrong
                // document.querySelector('#forecast').innerHTML =
                // alert(data.message);
                renderAlert('warning', data.message);

            }
        })
        .catch(err => {
            // network error?
            renderAlert('danger', err);
        });
});
