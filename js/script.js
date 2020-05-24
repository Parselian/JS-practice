'use-strict';

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader'),
        guestCalc = document.querySelector('.guest-calc'),
        calcTitle = guestCalc.querySelector('.guest-calc__title'),
        calcDropdown = guestCalc.querySelector('.guest-calc__dropdown'),
        calcButtons = guestCalc.querySelector('.guest-calc__buttons');
        
  function hidePreloader() {
    let timerId = setTimeout(() => {
      preloader.classList.remove('preloader_visible');
    }, 1000);
  }
  hidePreloader();

  const controlInputButtons = () => {
    calcDropdown.remove();
    
    function hideAllInputButtons() {
      const calcItems = guestCalc.querySelectorAll('.item-input__arrow')
      calcItems.forEach(item => {
        item.classList.add('item-input_hidden');
      });
    }

    function showInputButtons(target) {
      target.nextElementSibling.classList.remove('item-input_hidden');
      target.previousElementSibling.classList.remove('item-input_hidden');
    }

    function changeInputValue(target) {
      if (target.matches('.item-input__plus')) {
        target.previousElementSibling.value++;
        showDropdown(target);
      } else if (target.matches('.item-input__minus') && 
      target.nextElementSibling.value > 0) {
          target.nextElementSibling.value--;
      }
    }

    function showDropdown(target) {
      let parentElem = target.parentElement.parentElement,
          clonedDropdown = calcDropdown.cloneNode(true);

      if (!parentElem.nextElementSibling) {
        parentElem.insertAdjacentElement('afterend', clonedDropdown);
      }

      
    }

    //controlling inputs
    guestCalc.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;

      if (!target.matches('.item-input__arrow')) {
        hideAllInputButtons();
      }

      if (target.matches('.item-input')) {
        showInputButtons(target);
      } else if (target.matches('.item-input__arrow')) {
        changeInputValue(target);
      }
    });
  };
  controlInputButtons();
});