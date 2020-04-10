'use-strict'

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader'),
        clockAnalog = document.querySelector('.clock'),
        clockDigital = document.querySelector('.clock-digital');

  function hidePreloader() {
    let timerId = setTimeout(() => {
      preloader.classList.remove('preloader_visible');
    }, 2000)
  }
  hidePreloader();

  function getTime() {
    const date = new Date();

    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliseconds = date.getMilliseconds();

    return {hours, minutes, seconds, milliseconds}
  }

  function animateClockArrows(calcTime) {
    const clockArrows = clockAnalog.querySelector('.clock__arrows'),
      secondHand = clockArrows.querySelector('.clock__arrows-arrow_second'), minuteHand = clockArrows.querySelector('.clock__arrows-arrow_minute'), hourHand = clockArrows.querySelector('.clock__arrows-arrow_hour');

    let intervalId,
        secondHandAngle,
        minuteHandAngle,
        hourHandAngle; 

    function rotateArrows(currentTime) {
      secondHandAngle = (currentTime.seconds / 60) * 360,
      minuteHandAngle = (currentTime.minutes) * 6,
      hourHandAngle = currentTime.hours > 12 ? (currentTime.hours - 12) * 30 : currentTime.hours * 30;

      secondHand.style.transform = `translate(0, -14px) 
        rotate(${Math.ceil(secondHandAngle) - 90}deg)`;
      minuteHand.style.transform = `translate(-6.4px,-13px) 
        rotate(${Math.ceil(minuteHandAngle) - 90}deg)`;
      hourHand.style.transform = `translate(-2px,-31.4px) 
        rotate(${Math.ceil(hourHandAngle) - 90}deg)`;
    }

    function updDigitalClock(currentTime) {
      let seconds = currentTime.seconds < 10 ? 
        '0' + currentTime.seconds : currentTime.seconds, 
          minutes = currentTime.minutes < 10 ? 
            '0' + currentTime.minutes : currentTime.minutes,
          hours = currentTime.hours < 10 ? 
            '0' + currentTime.hours : currentTime.hours;

      clockDigital.textContent = `${hours}:${minutes}:${seconds}`;
    }

    intervalId = setInterval(() => {
      rotateArrows(calcTime());

      updDigitalClock(calcTime());
    }, 1000);
  }
  animateClockArrows(getTime);

  function toggleClocks() {
    clockAnalog.addEventListener('mouseenter', () => {
      clockDigital.classList.add('clock-digital_fadein');
    });

    clockAnalog.addEventListener('mouseleave', () => {
      clockDigital.classList.remove('clock-digital_fadein');
    })
  }
  toggleClocks();
});