'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  _setDecription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.decription = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    // clac pace
    this.calcPace();
    this._setDecription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    // clac pace
    this.calcSpeed();
    this._setDecription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// Application Architecture
// ====================== [App Class] ======================

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  constructor() {
    this._getPosition();
    // Get workouts from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your location');
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // show your current location in google map
    console.log(`https://google.pt/maps/@${latitude},${longitude}`);

    this.#map = L.map('map').setView([51.505, -0.09], this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // This event triggers when I click on a map marker, navigating to the point where the marker was clicked.
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      // If you try to display markup on the map in this line(in get local storage function), it will cause an error because this line is executed before the map is loaded.
      // Therefore, we will move it and place it after the map has fully loaded.
      this._renderWorkoutMarkup(workout);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    // inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
    // inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');

    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    // Get date from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // If workout running, cerate running object
    if (type === 'running') {
      const candence = +inputCadence.value;
      // check if data is valid
      if (
        !validInputs(distance, duration, candence) ||
        !allPositive(distance, duration, candence)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Running([lat, lng], distance, duration, candence);
    }
    // If workout cycling , create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration, elevation)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkout(workout);
    // Display marker
    this._renderWorkoutMarkup(workout);

    this.hideForm();
    // set local storage
    this._setLocalStorage();
  }
  hideForm() {
    // Clear input fields
    inputDuration.value =
      inputCadence.value =
      inputDistance.value =
      inputElevation.value =
        '';
    form.computedStyleMap.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      (form.computedStyleMap.display = 'grid'), 1000;
    });
  }
  _renderWorkoutMarkup(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          // running-popup for green color
          // cycling-popup for orange color
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.decription}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.decription}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
         `;
    if (workout.type === 'running')
      html += `
         <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    if (workout.type === 'cycling')
      html += `
     <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
    `;
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // Using the public interface
    // workout.click();
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('workouts'));
      if (!Array.isArray(data)) return; // Ensure data is an array

      this.#workouts = data;
      this.#workouts.forEach(workout => {
        this._renderWorkout(workout);
        // If you try to display markup on the map in this line, it will cause an error because this line is executed before the map is loaded.
        // Therefore, we will move it and place it after the map has fully loaded.
        // this._renderWorkoutMarkup(workout);
      });
    } catch (error) {
      console.error('Error parsing workouts from localStorage:', error);
    }
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
// app.reset();
