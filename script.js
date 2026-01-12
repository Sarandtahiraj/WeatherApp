const apiKey = "416a3e4811a6467597d160726261201";
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const weatherIcon = document.querySelector(".weather-icon i");

async function checkWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    const response = await fetch(url);

    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-container").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".location").innerHTML = data.location.name;
    document.querySelector(".temperature").innerHTML =
        Math.round(data.current.temp_c) + "&#176;C";

    document.querySelector(".weather-description").innerHTML =
        data.current.condition.text;

    document.querySelectorAll(".detail-value")[0].innerHTML =
        data.current.humidity + "%";

    document.querySelectorAll(".detail-value")[1].innerHTML =
        data.current.wind_kph + " km/h";

    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("sun")) {
        weatherIcon.className = "fas fa-sun";
    } else if (condition.includes("cloud")) {
        weatherIcon.className = "fas fa-cloud";
    } else if (condition.includes("rain")) {
        weatherIcon.className = "fas fa-cloud-rain";
    } else if (condition.includes("snow")) {
        weatherIcon.className = "fas fa-snowflake";
    } else if (condition.includes("storm") || condition.includes("thunder")) {
        weatherIcon.className = "fas fa-bolt";
    } else {
        weatherIcon.className = "fas fa-cloud-sun";
    }

    document.querySelector(".weather-container").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});
