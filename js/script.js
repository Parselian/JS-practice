'use-strict'

window.addEventListener('DOMContentLoaded', () => {
  function getTime() {
    const date = new Date();

    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliseconds = date.getMilliseconds();

    return {hours, minutes, seconds, milliseconds}
  }

  function animateClockArrows(calcTime) {
    const clockArrows = document.querySelector('.clock__arrows'),
      secondHand = clockArrows.querySelector('.clock__arrows-arrow_second'), minuteHand = clockArrows.querySelector('.clock__arrows-arrow_minute'), hourHand = clockArrows.querySelector('.clock__arrows-arrow_hour');

    let intervalId,
        currentTime,
        secondHandAngle,
        minuteHandAngle,
        hourHandAngle; 

    intervalId = setInterval(() => {
      currentTime = calcTime(),
      secondHandAngle = (currentTime.seconds / 60) * 360,
      minuteHandAngle = (currentTime.minutes) * 6,
      hourHandAngle = currentTime.hours > 12 ? (currentTime.hours - 12) * 30 : currentTime.hours * 30;

      secondHand.style.transform = `translate(0, -14px) 
        rotate(${Math.ceil(secondHandAngle) - 90}deg)`;
      minuteHand.style.transform = `translate(-6.4px,-13px) 
        rotate(${Math.ceil(minuteHandAngle) - 90}deg)`;
      hourHand.style.transform = `translate(-2px,-31.4px) 
        rotate(${Math.ceil(hourHandAngle) - 90}deg)`;

      console.log(`${currentTime.hours}:${currentTime.minutes}:${currentTime.seconds}`);
    }, 1000);
  }
  animateClockArrows(getTime);
});