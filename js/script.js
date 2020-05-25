'use-strict';

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader'),
				guestCalc = document.querySelector('.guest-calc'),
				guestCalcWrap = guestCalc.querySelector('.guest-calc__wrap'),
        calcTitle = guestCalc.querySelector('.guest-calc__title'),
        calcItem = guestCalc.querySelector('.guest-calc__item'),
        calcDropdown = guestCalc.querySelector('.guest-calc__dropdown'),
        calcButtons = guestCalc.querySelector('.guest-calc__buttons');
        
  function hidePreloader() {
    let timerId = setTimeout(() => {
      preloader.classList.remove('preloader_visible');
    }, 10);
  }
  hidePreloader();

  const controlInputButtons = () => {
    calcDropdown.remove();

    function removeItemInput(target) {
			let parentBlock = target.closest('.guest-calc__item'),
					parentSibling = parentBlock.nextElementSibling;

			if (parentSibling && parentSibling.matches('.guest-calc__dropdown')) {
				parentBlock.nextElementSibling.remove();
			}

			target.closest('.guest-calc__item').remove();
			
    }

    function addItemInput() {
			let clonedItem = calcItem.cloneNode('true');

      guestCalcWrap.insertAdjacentElement('beforeend', clonedItem);
    }
    
    function hideAllInputButtons() {
      const calcItems = guestCalc.querySelectorAll('.item-input__arrow');

      calcItems.forEach(item => {
        item.classList.add('item-input_hidden');
      });
    }

    function showInputButtons(target) {
      target.nextElementSibling.classList.remove('item-input_hidden');
      target.previousElementSibling.classList.remove('item-input_hidden');
    }

    function changeInputValue(target, maxGuests) {
      let prevElemNeighbor = target.previousElementSibling,
          nextElemNeighbor = target.nextElementSibling;

      if (target.matches('.item-input__plus') && prevElemNeighbor.value < maxGuests) {
        prevElemNeighbor.value++;
      } else if (target.matches('.item-input__minus') && 
      nextElemNeighbor.value > 0) {
				nextElemNeighbor.value--;
      }
    }

    function toggleDropdown(target) {
      let parentElem = target.parentElement.parentElement,
          parentNeighbor = parentElem.nextElementSibling,
          inputChildren = target.parentElement.querySelector('.item-input'),
          clonedDropdown = calcDropdown.cloneNode(true);

      if (parentNeighbor !== clonedDropdown && inputChildren.value > 0 && inputChildren.matches('.input_children')) {

        parentElem.insertAdjacentElement('afterend', clonedDropdown);
			} else if (parentNeighbor && inputChildren.value <= 0 && 
			parentNeighbor.matches('.guest-calc__dropdown') && inputChildren.matches('.input_children')) {

        parentNeighbor.remove();
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
        changeInputValue(target, 3);
        toggleDropdown(target);
      } else if (target.closest('.guest-calc__item-remove')) {
        removeItemInput(target);
      } else if (target.matches('#button-add')) {
        addItemInput();
      }
    });
  };
  controlInputButtons();
});