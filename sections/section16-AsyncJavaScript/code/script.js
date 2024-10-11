"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderCountry = function (data) {
  const html = `
    <article class="country">
         <img class="country__img" src="${data.flags.png}"/>
         <div class="country__data">
           <h3 class="country__name">${data.name.common}</h3>
           <h4 class="country__region">${data.region}</h4>
           <p class="country__row"><span>👫</span>${(
             data.population / 1000000
           ).toFixed(1)} million people</p>
           <p class="country__row"><span>🗣️</span>${Object.values(
             data.languages
           ).join(", ")}</p>
           <p class="country__row"><span>💰</span>${
             Object.values(data.currencies)[0].name
           }</p>
         </div>
       </article>
   `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

///////////////////////////////////////

// ============================= [Interacting with the REST Countries API] =======================

// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//        <article class="country">
//             <img class="country__img" src="${data.flags.png}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name.common}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 data.population / 1000000
//               ).toFixed(1)} million people</p>
//               <p class="country__row"><span>🗣️</span>${Object.values(
//                 data.languages
//               ).join(", ")}</p>
//               <p class="country__row"><span>💰</span>${
//                 Object.values(data.currencies)[0].name
//               }</p>
//             </div>
//           </article>
//       `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountry("france"); // Example to test with a country name

// ============================= [Callback Hell] =============================

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render Country 1
//     renderCountry(data);
//     // Get neightbout country
//     const [neightbour] = data.borders;

//     if (!neightbour) return;
//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neightbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       console.log(this.responseText);
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2);
//     });
//   });
// };

// getCountryAndNeighbour("portugal"); // Example to test with a country name

// ============================= [Solve Callback Hell Using promises] =============================

// fetch ===> return promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // response.json return promises
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     });
// };

// make it better

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => renderCountry(data[0]));
// };

// getCountryData("portugal");

// ========================== [Chaining Promises] ==========================

// const getCountryData = function (country) {
//   // Fetch country data
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const [neighbour] = data.borders[0]; // Access the borders of the country
//       if (!neighbour) return; // Exit if there are no neighbours
//       // Fetch neighbour country data
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data);
//     }); // Render neighbour country data
// };

// getCountryData("portugal");

// ========================== [Handling Rejected Promises] ==========================

// const getCountryData = function (country) {
//   // Fetch country data
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const [neighbour] = data[0].borders; // Access the borders of the country
//       if (!neighbour) return; // Exit if there are no neighbours

//       // Fetch neighbour country data
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data);
//     })
//     .catch((err) => {
//       renderError(`Something went wrong: ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData("portugal");

// ========================== [Throwing Errors Manually] ==========================
// const getCountryData = function (country) {
//   // Fetch country data
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       if (!response) throw new Error(`Country not found ${response}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0]; // Access the borders of the country
//       if (!neighbour) return; // Exit if there are no neighbours

//       // Fetch neighbour country data
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response) throw new Error(`Country not found ${response}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data);
//     })
//     .catch((err) => {
//       renderError(`Something went wrong: ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData("portugal");
const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};
const setTime = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),

  setTime(0.07),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));
