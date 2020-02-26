window.addEventListener('load', () => {
	let long;
	let lat;
	let tempDescription = document.querySelector('.temperature-description');
	let tempDegree = document.querySelector('.temperature-degree');
	let location = document.querySelector('.location-timezone');
	let tempSection = document.querySelector('.degree-section');
	let tempSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/d037cefd37fd8f28c26416927a980fe4/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temperature, summary, icon } = data.currently;

					// Set DOM Elements
					tempDegree.textContent = temperature;
					tempDescription.textContent = summary;
					location.textContent = data.timezone;
					//Formula for degree conversion
					let celcius = ((temperature - 32) * 5) / 9;
					// setIcon
					setIcons(icon, document.querySelector('.icon'));
					//change to Celcius
					tempSection.addEventListener('click', () => {
						if (tempSpan.textContent === 'F') {
							tempSpan.textContent = 'C';
							tempDegree.textContent = Math.floor(celcius);
						} else if (tempSpan.textContent === 'C') {
							tempSpan.textContent = 'F';
							tempDegree.textContent = Math.floor(temperature);
						}
					});
				});
		});
	} else {
		h1.textContent = 'Geolocation not supported. Turn on location';
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: 'white' });
		const currnetIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currnetIcon]);
	}
});
