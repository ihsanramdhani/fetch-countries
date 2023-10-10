'use-strict'

const countriesContainer = document.querySelector('.countries');

const totalPopulation = function (num) {
  if (num > 1_000_000) return (num / 1_000_000).toFixed(1) + ' million';
  if (num > 1_000) return (num / 1_000).toFixed(1) + ' thousand';
  return num;
};
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${totalPopulation(
        data.population
      )} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const request = fetch(
  'https://countries-api-836d.onrender.com/countries/name/portugal'
);
console.log(request);

// get countries data
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => {
      console.log(response);
      // this json method is also a promise
      // so we have to process it further with then method
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(typeof data[0].population);
      renderCountry(data[0]);
      const neighbour = data[0]?.borders;

      return neighbour;
    })
    // render neighbour countries
    .then(data =>
      data.forEach(border => {
        return fetch(
          `https://countries-api-836d.onrender.com/countries/alpha/${border}`
        )
          .then(response => response.json())
          .then(data => {
            renderCountry(data, 'neighbour');
          });
      })
    );
};

getCountryData(window.prompt(`Masukkan negara yang ingin kamu cari: `));