const timePointers = document.getElementsByClassName('time-pointers');
const clockElement = document.getElementsByClassName('clock-container')[0];

let hour = null;
let second = null;
let minute = null;

let hourRotationDegree = null;
let minuteRotationDegree = null;
let secondRotationDegree = null;

const customTime = {
  useCustomTime: false,
  customHour: null,
  customMinute: null,
  customSecond: null,
};


/**
 * This snippet plots all the time pointers for digits of clock
 * and rotates each by 6 degrees to form 360 degree circle.
 */
for (let i = 1; i < 60; i++) {
  clockElement.innerHTML += "<div class='time-pointers'></div>";
  timePointers[i].style.transform = 'rotate(' + 6 * i + 'deg)';
}

/**
 * This interval fucntion takes a callback and runs it every second, 
 * the callback function checks which time is available custom(user entered)
 * or current time and based on it moves hands of clock.
 */

setInterval(() => {
  let currentTime = new Date();

  // If custom time is present it is used.
  if (customTime.useCustomTime) {
    hour = customTime.customHour || currentTime.getHours();
    minute = customTime.customMinute || currentTime.getMinutes();
    second = customTime.customSecond || currentTime.getSeconds();
  } 
  // The case when custom time is set once , 
  // so this snippet below keeps clock moving from there onwards.
  else if (
    !customTime.useCustomTime &&
    (customTime.customHour ||
      customTime.customMinute ||
      customTime.customSecond)
  ) {

    second++;

    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
    }
  }
  // If custom time is not present current time is used
   else {
    hour = currentTime.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    minute = currentTime.getMinutes();
    second = currentTime.getSeconds();
  }

  // Total roation in 1 hour = 360 deg (720 minutes and 3600 seconds)
  hourRotationDegree = hour * 30 + minute * (360 / 720);
  minuteRotationDegree = minute * 6 + second * (360 / 3600);
  secondRotationDegree = second * 6;

  hourElement = document.querySelector('.hour-hand');
  minuteElement = document.querySelector('.minute-hand');
  secondElement = document.querySelector('.second-hand');

  //This below snippet handles the rotation of hands of clock
  hourElement.style.transform = 'rotate(' + hourRotationDegree + 'deg)';
  minuteElement.style.transform = 'rotate(' + minuteRotationDegree + 'deg)';
  secondElement.style.transform = 'rotate(' + secondRotationDegree + 'deg)';

  customTime.useCustomTime = false;
  
}, 1000);

/**
 * 
 * @param {string} format 
 * This is a common method used to take hour , minute and second format from user 
 * and set clock according to that.
 */
function handleCustomTime(format) {
  if (format === 'hour') {
    const hourValue = document.getElementById('hour-input').value;
    if (hourValue > 12 || hourValue < 1) {
      document.getElementById('hour-input').value = hour;
      return;
    }
    customTime.customHour = hourValue;
  }
  if (format === 'minute') {
    const minuteValue = document.getElementById('minute-input').value;
    if (minuteValue > 60 || minuteValue < 0) {
      document.getElementById('minute-input').value = minute;
      return;
    }
    customTime.customMinute = minuteValue;
  }
  if (format === 'second') {
    const secondValue = document.getElementById('second-input').value;
    if (secondValue > 60 || secondValue < 0) {
      document.getElementById('second-input').value = second;
      return;
    }
    customTime.customSecond = secondValue;
  }
  customTime.useCustomTime = true;
}

/**
 * This method resets input fields and custom time entries.
 */
function reset() {
  customTime.useCustomTime = false;
  customTime.customHour = null;
  customTime.customMinute = null;
  customTime.customSecond = null;
  document.getElementById('hour-input').value = '';
  document.getElementById('minute-input').value = '';
  document.getElementById('second-input').value = '';
}

/**
 * This method calculates the acute angle by subtracting 
 * the angle between the hour hand and the minute hand.
 * While printing time it checks and adds zero to minutes and seconds if greater than 10
 */
function getAcuteAngle() {
  const angle = Math.abs(hourRotationDegree - minuteRotationDegree);
  const acuteAngle = 360 - angle < angle ? 360 - angle : angle;
  document.getElementById('angle-container').innerHTML = `Angle at ${hour}:${
    minute < 10 ? '0' + minute : minute
  }:${second < 10 ? '0' + second : second} is ${acuteAngle.toFixed(2)} degrees`;
}
