window.addEventListener('DOMContentLoaded', () => {
    //tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

//    function hideTabContent() {
//        tabsContent.forEach(item => {
//              item.style.display = 'none';
//        });
//        tabs.forEach(item => {
//              item.classList.remove('tabheader__item_active');
//        });
//    }

function hideTabContent() {
    tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');
    });
}

   function showTabContent(i = 0) {
       tabsContent[i].classList.add('show', 'fade');
       tabsContent[i].classList.remove('hide');
       tabs[i].classList.add('tabheader__item_active');
   } 
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
           tabs.forEach( (item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
           });   
        }
   });


   //timer
   const deadLine = '2020-09-14';

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
   setClock('.timer', deadLine);

   //modal window

   const btn = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal');
            // closeModal = document.querySelector('[data-close]');
 
   btn.forEach(item => {
        item.addEventListener('click', openModalWindow);            
   });

//    closeModal.addEventListener('click',  closeModalWindow);

   modalWindow.addEventListener('click', (e) => {
       
            if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
                closeModalWindow();
            }
   });
   
   document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
                closeModalWindow();
            }
   });
    
   window.addEventListener('scroll', showModalByScroll);

   const modalTimerId = setTimeout(openModalWindow, 300000);
   
   function openModalWindow () {
            modalWindow.classList.add('show');
            modalWindow.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
   }
   function closeModalWindow() {
            modalWindow.classList.add('hide');
            modalWindow.classList.remove('show');
            document.body.style.overflow = '';
   }
   function showModalByScroll (){
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModalWindow();
                window.removeEventListener('scroll', showModalByScroll);
            }
   }

   // class for card

   
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
    async function getResource(url) {
            let resouce = await fetch(url);

            if(!resouce.ok) {
                throw new Error(`could not fetch ${url} status: ${resouce.status}`);
            }

            return await resouce.json();
    }


    getResource('http://localhost:3000/menu')
        .then( data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new createCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
// class createCard {
//     constructor(src, alt, title, descr, price, parentSelector, ...classes){
//         this.src = src;
//         this.title = title;
//         this.descr = descr;
//         this.price = price; 
//         this.alt = alt;
//         this.classes = classes;
//         this.parenSelector = document.querySelector(parentSelector);
//         this.transfer = 27;
//         this.changeToUan();


//     }
//     changeToUan () {
//         this.price = (this.price / this.transfer).toFixed(2);
//     }


//     render() {
//         const menuItem = document.createElement('div');

//             if (this.classes.length === 0) {
//                 this.menuItem = 'menu__item';
//                 menuItem.classList.add(this.menuItem);
//             }else {
//                 this.classes.forEach(className => menuItem.classList.add(className));
//             }
//             menuItem.innerHTML = 
//                     `<img src=${this.src} alt=${this.alt}>
//                     <h3 class="menu__item-subtitle">${this.title}</h3>
//                     <div class="menu__item-descr">${this.descr}</div>
//                     <div class="menu__item-divider"></div>
//                     <div class="menu__item-price">
//                         <div class="menu__item-cost">Цена:</div>
//                         <div class="menu__item-total"><span>${this.price}</span> долл/день</div>
//                     </div>`;
//             this.parenSelector.append(menuItem);
   
//     }
// }

//     new createCard(
//         'img/tabs/vegy.jpg',
//         'vegy',
//         'Меню "Фитнес"',
//         `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
//         Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
//         229,
//         '.menu .container',
//         'menu__item'
//     ).render();

//         new createCard(
//             'img/tabs/elite.jpg',
//             'elite',
//             'Меню “Премиум”',
//             `В меню “Премиум” мы используем не только красивый дизайн упаковки,
//             но и качественное исполнение блюд. Красная рыба,
//             морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
//             550,
//             '.menu .container',
//             'menu__item'
//         ).render();

//     new createCard(
//         'img/tabs/post.jpg',
//         'post',
//         'Меню "Постное"',
//         `Меню “Постное” - это тщательный подбор ингредиентов: 
//         полное отсутствие продуктов животного происхождения, молоко
//         из миндаля, овса, кокоса или гречки, 
//         правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
//         430,
//         '.menu .container',
//         'menu__item'
//     ).render();

       // forms
       
const forms = document.querySelectorAll('form'),
      massege = {
          loading: 'img/form/spinner.svg',
          success: 'success',
          failure: 'failure'
      };

    forms.forEach(form => {
        bindPostForm(form);
    });

//  http://localhost:3000/menu

const postForm = async (url, data) => {
            let result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
            return await result.json();
};


function bindPostForm (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const statusMessage = document.createElement('img');
            statusMessage.src = massege.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        form.insertAdjacentElement('afterend', statusMessage );

        const formData = new FormData(form),
            object = JSON.stringify(Object.entries(formData.entries()));

           
    postForm('http://localhost:3000/menu', object)
        .then(data => {
            
            showthanksModal(massege.success);
            statusMessage.remove();
        })
        .catch( () => {
            showthanksModal(massege.failure);
        })
        .finally( () => {
            form.reset();
        });
    });
}  

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
            closeModalWindow();
        }, 4000);
}

//slider 

//1) обернуть слайды в еще один див class = 'inner';
//2) получить wrapper  и сщзданный перед этим див inner;
//3) получитть ширину wrappera c помощью getComputedStyles.width;
//4) установить ширину inner как 100% * количество слайдов;
//5) установить ширину каждого слайда равную ширене wrappera;
//6) поставить слайды в один ряд (задать стили для inner display: flex;  transition: 0.5x all);
//7) для wrapper скрыть слайды которые не поомещфются (overflow: hidden)
//8) создать переменню для фиксирования отступа;
//9) установить обработчик событий next
  //9.1) задать круговой переход слайдов / смещение слайдов;
  //9.2) смещать inner с помощью transform: translateX(``);
//10) установить обработчик событий prev
  //10.1) задать круговой переход слайдов / смещение слайдов;
  //10.2) смещать inner с помощью transform: translateX(``);
//11) задать переключение номерации слайдов / общего количества 
//12) получить весь слайдер, установить ему position: relative;
//13) создать оббертку для точек
//14) создать количество точек которое равно количесву слайдов.
//15) добавить атрибут для каждой точки
//16) добавить класс активности.
//17) кликая на каждую точку будет переьущаться на соответсвующий слайд.

// const sliders = document.querySelectorAll('.offer__slide'),
//         togglePrev = document.querySelector('.offer__slider-prev'),
//         toggleNext = document.querySelector('.offer__slider-next'),
//         totlalCounter = document.querySelector('#total'),
//         currentCounter =  document.querySelector('#current');

// let counterSlider = 1;

//     totlalCounter.textContent = sliders.length;
// if(totlalCounter.textContent < 10) {
//         totlalCounter.textContent = `0${sliders.length}`;
//     }



// showSlide (counterSlider);

// function showSlide (n) {
        
//         if(n > sliders.length){
//             counterSlider = 1;
//             n = 1;
//         }else if(n < 1){
//             counterSlider = sliders.length;
//             n = sliders.length;
//         }

//         sliders.forEach(slide => {
//             slide.classList.add('hide');
//             slide.classList.remove('show');
//         });

//         sliders[counterSlider - 1].classList.add('show');
//         sliders[counterSlider - 1].classList.remove('hide');
        

//         if(n < 10){
//             currentCounter.textContent = `0${counterSlider}`;
//         }else{
//             currentCounter.textContent = counterSlider;
//         }

//     }

// toggleNext.addEventListener('click', () => {
//             showSlide( ++counterSlider);
//     });

// togglePrev.addEventListener('click', () => {
//         showSlide(--counterSlider);
//     });
   

const sliders = document.querySelectorAll('.offer__slide'),
        togglePrev = document.querySelector('.offer__slider-prev'),
        toggleNext = document.querySelector('.offer__slider-next'),
        totlalCounter = document.querySelector('#total'),
        currentCounter =  document.querySelector('#current'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderField = document.querySelector('.offer__slider-inner'),
        widthWrapper = window.getComputedStyle(sliderWrapper).width;

let counterSlider = 1,
     offset = 0;

const slider = document.querySelector('.offer__slider'),
     dotsWrapper = document.createElement('div'),
     dot = document.createElement('div');
     
     dotsWrapper.classList.add('carousel-indicators');
     
for(let i = 1; i <= sliders.length; i++) {
       dotsWrapper.innerHTML += `<div data-dot = '${i}' class = 'dot'></div>`; 
   }

   slider.append(dotsWrapper);

const dots = document.querySelectorAll('.dot');

sliderField.style.cssText = `
        width:  ${100 * sliders.length}%;
        display: flex;
        transition: 0.7s all;
` ;

    sliders.forEach(slide => slide.style.width = widthWrapper);

    sliderWrapper.style.overflow = 'hidden';

    if(sliders.length < 10) {
        totlalCounter.textContent = `0${sliders.length}`;
    }else{
        totlalCounter.textContent = sliders.length;
    }

function toggleSlide (n = 0) {

    dots.forEach(dot => dot.classList.remove('activeDot'));

    sliderField.style.transform = `translateX(-${offset}px)`;
  
    counterSlider += n;

    if(counterSlider < 10) {
        currentCounter.textContent = `0${counterSlider}`;
    }else{
        currentCounter.textContent = counterSlider; 
    }

    document.querySelector(`[data-dot = '${counterSlider}' ]`).classList.add('activeDot');   
}

toggleSlide();

function deliteNotDigit(str){
    return Math.round(+str.replace(/[A-Za-z]/g, '')) ;
}

toggleNext.addEventListener('click', () => {
        if(offset == deliteNotDigit(widthWrapper) * ( sliders.length - 1)) {
            offset = 0;
            counterSlider = 0;
            
        }else{
            offset += deliteNotDigit(widthWrapper);
        }

        toggleSlide (1);
});

togglePrev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deliteNotDigit(widthWrapper) * ( sliders.length - 1);
            counterSlider = sliders.length + 1;
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
                    currentCounter.textContent = `0${counterSlider}`;
                }else{
                    currentCounter.textContent = counterSlider; 
                }

                if(target == 1){
                    offset = 0;
                    sliderField.style.transform = `translateX(${offset}px)`;
                   
                }else if(target == sliders.length){
                    offset = deliteNotDigit(widthWrapper) * (sliders.length - 1);
                    sliderField.style.transform = `translateX(-${offset}px)`;
                }else{
                    offset = deliteNotDigit(widthWrapper) * (target - 1);
                    sliderField.style.transform = `translateX(-${offset}px)`;
                }
            
            
        });
        
});

// calculator 

//1) назначить id для полов
//2) назначить data atributes для с задаными значениями в зависимости от активности
//3) получить елемент с результатом
//4) создать переменные sex height, weight, age, ration

//5) создать функцию для расчетов по формуле 
    //5.1) проверить введены ли все данные
    //5.2)  проверить введенный пол
    //5.3) задать формулу в зависимости от пола
    //5.4) взвать функцию


//6) написать функцию для получения сеатических данных / навесить обработчики событий
    //6.1) задать аргументы parentSelector and activeClass
    //6.2) получить все div внутри parentSelector
    //6.3)навесить обработчик событий на parentSelector
        //6.3.1) получить либо пол либо ratio использовать getAtribut('data-ratio') / getAtribute("id")
        //6.3.2) убрать класс активности у всех елементов
        //6.3.3) назначить класс активности нужноьу елементу
    //6.4) вызвать написанную функцию для пола
    //6.5) вызвать написанную функцию для активности

//7)создать функцию для обработки иьпутов
    //7.1) задать аргуьент selector
    //7.2) получть импут
    //7.3) навесить на импут обработчик событий
        //7.3.1) с помощью switch case проверить вид инпута / записать в соответствующую переменную значение импута
    //7.4) вызвать написанную функцию для трех разных селекторов

//8) вызывать функцию для расчетов по формуле внутри обработчиков событий
//9) округлить значение до ближайшего целого

//10) фиксить баг с делегированием событий (выделяется весь див а ен только необходимый)
    //10.1) заместь деллегирования навесить обработчики с поьщщью forEach

//11) установиьь дефолтные значения для пола и активности

//12) в функции для обработки импутов дописать проверку на ввод ккоректных данных
    //12.1) при поощи /\D/g определить ести ли что то ккроме цифр
    //12.2) прокрасит border в красный цвет / убрать красный если данные коректные

//13) в функции для статичных данных записвать значения в localStorage
    //13.1) помещать зачения для статичных данных из localStorage или задать дефолтные и поместить в localStorage
    //13.1) написать функцию для задания классов актиности  взятые из local Storagae
        //13.1.1) задать два атрибута selector and acriveClass
        //13.1.2) получить все елементы внутри selector
        //13.1.3) перебрать  полученные елементы  
            //13.1.4) удалить класс активности
            //13.1.5) проверить совпвдение значения id или dataAtribute с совпадением 
                     //значений находящихся в localStorage
            //13.1.6)  вслучае совпадения назначиь класс асктивности
            //13.1.7) вызвать данную функцию два раза с разными значениями
            

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
getDinamicContent ('#age', 1, 150);


});


