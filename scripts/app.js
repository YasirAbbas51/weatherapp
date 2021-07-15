const CityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forcast = new Forcast();

//update UI
const updateUI = (data) => {

    //destructuring
    const { cityDetails, weatherDetails } = data;

    //change the inner details and enter the updated info
    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
                <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weatherDetails.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weatherDetails.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            </div>
    `;
    //adding icons of weather
    let iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    //adding img of day/night
    let timesrc = weatherDetails.IsDayTime ? './img/day.svg' : './img/night.svg'

    time.setAttribute('src', timesrc);

    // removes d - none class after getting details
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};


CityForm.addEventListener('submit', e => {

    //prevent default action of loading the page
    e.preventDefault();

    //gets valur from input field and store on city var
    const city = CityForm.city.value.trim();

    //clears the input field
    CityForm.reset();

    forcast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))

    //set local storage
    localStorage.setItem('city',city);
});

if(localStorage.getItem('city'))
{
    forcast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}