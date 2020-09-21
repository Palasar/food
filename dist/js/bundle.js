/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator (){
    const resultCalories = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio, warning, wrapperForWarning;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', `${sex}`);
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', `${ratio}`);
    }

    getActveClass('#gender div', 'calculating__choose-item_active');
    getActveClass('.calculating__choose_big div', 'calculating__choose-item_active');

    function getActveClass(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute("id") == localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }else if(elem.getAttribute("data-ratio") == localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    function calculateCalories () {
        if(!height || !weight || !age) {
            resultCalories.textContent = '____';
            return;
        }
        if(sex == 'female') {
            resultCalories.textContent = Math.round(447.6 + (9.2  * weight) + (3.1 * height) - (4.3 * age) * ratio);
        }else{
            resultCalories.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }
    }
    calculateCalories ();

    function getStaticContent(selector, activeClass) {
        const allElement = document.querySelectorAll(`${selector}`);

        allElement.forEach(elem => {
            
            elem.addEventListener('click', (e) => {
    
                if(e.target.getAttribute('data-ratio')){
                    ratio = e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', `${ratio}`);

                    allElement.forEach(elem => elem.classList.remove(`${activeClass}`));
                    e.target.classList.add(`${activeClass}`);
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', `${sex}`);

                    allElement.forEach(elem => elem.classList.remove(`${activeClass}`));
                    e.target.classList.add(`${activeClass}`);
                }
                calculateCalories ();
            });
        });
    }

    getStaticContent('#gender div', 'calculating__choose-item_active');
    getStaticContent('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicContent (selector, min, max) {
        const input = document.querySelector(`${selector}`);

            input.addEventListener('input', (e) => {

                if(input.value.match(/[^0-9.,]/g) || input.value < min || input.value > max){
                    input.style.border = '1px solid red';
                    resultCalories.textContent = '____';

                    const getWarning = function(selector)  {
                        if(!warning){
                            warning = document.createElement('div');
                        }
                        warning.textContent = `введите значение от ${min} до ${max}`;
                        warning.classList.add('calculating__choose_warning');
                        wrapperForWarning = document.querySelector(selector);
                        wrapperForWarning.style.position = 'relative';
                        wrapperForWarning.append(warning);
                    };
                    
                    switch (input.getAttribute('id')) {
                        case 'height':
                            getWarning ('.calculating__choose_wrapper-height');
                            break;
                        case 'weight':
                            getWarning ('.calculating__choose_wrapper-weight');
                            break;
                        case 'age':
                            getWarning ('.calculating__choose_wrapper-age');
                            break;   
                    }
                }else{
                    input.style.border = 'none';
                    warning.remove();
                    switch (input.getAttribute('id')) {
                        case 'height':
                            height = input.value.replace(/,/, '.');
                            break;
                        case 'weight':
                            weight = input.value.replace(/,/, '.');
                            break;
                        case 'age':
                            age = input.value.replace(/,/, '.');
                            break;   
                    }
                    calculateCalories ();
                }  
            });
    }

    getDinamicContent ('#height', 30, 230);
    getDinamicContent ('#weight', 3, 200);
    getDinamicContent ('#age', 1, 120);
}
/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./src/js/modules/card.js":
/*!********************************!*\
  !*** ./src/js/modules/card.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");
   // class for card 

function card () {
    class createCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.price = price; 
            this.alt = alt;
            this.classes = classes;
            this.parenSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUan();
        }
        changeToUan () {
            this.price = this.price * this.transfer;
    }
    
    render() {
        const menuItem = document.createElement('div');
    
            if (this.classes.length === 0) {
                this.menuItem = 'menu__item';
                menuItem.classList.add(this.menuItem);
            }else {
                this.classes.forEach(className => menuItem.classList.add(className));
            }
    
        menuItem.innerHTML = 
                    `<img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> долл/день</div>
                    </div>`;
        this.parenSelector.append(menuItem);
       
        }
    }
    

    
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
        .then( data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new createCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}
/* harmony default export */ __webpack_exports__["default"] = (card);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./src/js/modules/modalWindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms (formSelector) {
    const allForm = document.querySelectorAll(formSelector),
    massege = {
          loading: 'img/form/spinner.svg',
          success: 'success',
          failure: 'failure'
    };

    allForm.forEach(form => {
        bindPostForm(form);
        
    });


    function bindPostForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = massege.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postForm"])('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data );
                showthanksModal(massege.success);
                statusMessage.remove();
            }).catch(() => {
                showthanksModal(massege.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }


    // function bindPostForm (form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();
            
    //         const statusMessage = document.createElement('img');
    //             statusMessage.src = massege.loading;
    //             statusMessage.style.cssText = `
    //                 display: block;
    //                 margin: 0 auto;
    //             `;
    //         form.insertAdjacentElement('afterend', statusMessage );
        
    //         const formData = new FormData(form);
            
    //          const    object = JSON.stringify(Object.entries(formData.entries()));
            
            
    //     postForm('http://localhost:3000/requests', object)
    //         .then(data => {
    //             console.log(data);
    //             showthanksModal(massege.success);
    //             statusMessage.remove();
    //         })
    //         .catch( () => {
    //             showthanksModal(massege.failure);
    //         })
    //         .finally( () => {
    //             form.reset();
    //         });
    //     });
    // }  

    function showthanksModal (massege) {
        const prevModalDialog = document.querySelector('.modal__dialog');
                prevModalDialog.classList.add('hide');

        const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close="" class="modal__close">×</div>
                    <div class="modal__title">${massege}</div>
                </div>
                `;
                document.querySelector('.modal').append(thanksModal);
        
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                Object(_modalWindow__WEBPACK_IMPORTED_MODULE_0__["closeModalWindow"])('.modal');
            }, 4000);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modalWindow.js":
/*!***************************************!*\
  !*** ./src/js/modules/modalWindow.js ***!
  \***************************************/
/*! exports provided: default, closeModalWindow, openModalWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalWindow", function() { return closeModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModalWindow", function() { return openModalWindow; });
  //modal window
function openModalWindow (modalSelector, modalTimerId) {
   const  modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
   
}

function closeModalWindow(modalSelector) {
   const  modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal (modalSelector, btnSelector, modalTimerId) {
    const btn = document.querySelectorAll(btnSelector),
          modalWindow = document.querySelector(modalSelector);
  // closeModal = document.querySelector('[data-close]');

    btn.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));            
    });

    //    closeModal.addEventListener('click',  closeModalWindow);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    

  
    function showModalByScroll (){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const allSlide = document.querySelectorAll(slide),
        togglePrev = document.querySelector(prevArrow),
        toggleNext = document.querySelector(nextArrow),
        totlalCounter = document.querySelector(totalCounter),
        currentCounterr =  document.querySelector( currentCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field);
    const    widthWrapper = window.getComputedStyle(sliderWrapper).width;

    let counterSlider = 1,
        offset = 0;

    const slidee = document.querySelector(container),
        dotsWrapper = document.createElement('div'),
        dot = document.createElement('div');
        
        dotsWrapper.classList.add('carousel-indicators');
        
    for(let i = 1; i <= allSlide.length; i++) {
        dotsWrapper.innerHTML += `<div data-dot = '${i}' class = 'dot'></div>`; 
    }

    slidee.append(dotsWrapper);

    const dots = document.querySelectorAll('.dot');

    sliderField.style.cssText = `
            width:  ${100 * allSlide.length}%;
            display: flex;
            transition: 0.7s all;
    ` ;

    allSlide.forEach(slidee => slidee.style.width = widthWrapper);

    sliderWrapper.style.overflow = 'hidden';

    if(allSlide.length < 10) {
        totlalCounter.textContent = `0${allSlide.length}`;
    }else{
        totlalCounter.textContent = allSlide.length;
    }

    function toggleSlide (n = 0) {

        dots.forEach(dot => dot.classList.remove('activeDot'));

        sliderField.style.transform = `translateX(-${offset}px)`;
    
        counterSlider += n;

        if(counterSlider < 10) {
            currentCounterr.textContent = `0${counterSlider}`;
        }else{
            currentCounterr.textContent = counterSlider; 
        }

        document.querySelector(`[data-dot = '${counterSlider}' ]`).classList.add('activeDot');   
    }

    toggleSlide();

    function deliteNotDigit(str){
        return Math.round(+str.replace(/[A-Za-z]/g, '')) ;
    }

    toggleNext.addEventListener('click', () => {
        if(offset == deliteNotDigit(widthWrapper) * ( allSlide.length - 1)) {
            offset = 0;
            counterSlider = 0;
            
        }else{
            offset += deliteNotDigit(widthWrapper);
        }

        toggleSlide (1);
    });

    togglePrev.addEventListener('click', () => {
            if(offset == 0) {
                offset = deliteNotDigit(widthWrapper) * ( allSlide.length - 1);
                counterSlider = allSlide.length + 1;
            }else{
                offset -= deliteNotDigit(widthWrapper);
            }

            toggleSlide (-1);
    });

    dots.forEach(dot => {
            dot.addEventListener('click',  (e) => {
                dots.forEach(dot => dot.classList.remove('activeDot'));
                
                e.target.classList.add('activeDot');

                const target = e.target.getAttribute("data-dot");

                counterSlider = +target;

                if(counterSlider < 10) {
                    currentCounterr.textContent = `0${counterSlider}`;
                }else{
                    currentCounterr.textContent = counterSlider; 
                }

                if(target == 1){
                    offset = 0;
                    sliderField.style.transform = `translateX(${offset}px)`;
                    
                }else if(target == allSlide.length){
                    offset = deliteNotDigit(widthWrapper) * (allSlide.length - 1);
                    sliderField.style.transform = `translateX(-${offset}px)`;
                }else{
                    offset = deliteNotDigit(widthWrapper) * (target - 1);
                    sliderField.style.transform = `translateX(-${offset}px)`;
                }
                
                
            });
            
    });
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
    //tabs
function tab (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove( activeClass);
        });
    }

    function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add( activeClass);
    } 
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach( (item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
        });   
        }
    });
}
/* harmony default export */ __webpack_exports__["default"] = (tab);


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
  //timer
function timer (id, deadLine) {
    

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)  % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes' : minutes,
                'seconds': seconds
            };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes= timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
    updateClock();

    function updateClock(){
            const t = getTimeRemaining(endTime);

            if(t.total <= 0){
                days.innerHTML = '00';
                hours.innerHTML =  "00";
                minutes.innerHTML =  "00";
                seconds.innerHTML =  "00";
                clearInterval(timeInterval);
                
            }else{
                days.innerHTML =  getZero(t.days);
                hours.innerHTML =  getZero(t.hours);
                minutes.innerHTML =  getZero(t.minutes);
                seconds.innerHTML =  getZero(t.seconds);
            }   
        }
    }
    setClock(id, deadLine);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/card */ "./src/js/modules/card.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modalWindow */ "./src/js/modules/modalWindow.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
    
    
    
    
    
    
    
    

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout( () => Object(_modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', modalTimerId ), 300000);

    Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_modules_card__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form');
    Object(_modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', '[data-modal]', modalTimerId);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-06-11');

});




/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/*! exports provided: postForm, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postForm", function() { return postForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postForm = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await result.json();
};

async function getResource(url) {
    let resouce = await fetch(url);

    if(!resouce.ok) {
        throw new Error(`could not fetch ${url} status: ${resouce.status}`);
    }

    return await resouce.json();
}



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map