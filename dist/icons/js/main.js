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
            modalWindow = document.querySelector('.modal'),
            closeModal = document.querySelector('[data-close]');
 
   btn.forEach(item => {
        item.addEventListener('click', openModalWindow);            
   });

   closeModal.addEventListener('click',  closeModalWindow);

   modalWindow.addEventListener('click', (e) => {
       
            if (e.target === modalWindow) {
                closeModalWindow();
            }
   });
   
   document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
                closeModalWindow();
            }
   });
    
   window.addEventListener('scroll', showModalByScroll);

//    const modalTimerId = setTimeout(openModalWindow, 3000);
   
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
        this.price = (this.price / this.transfer).toFixed(2);
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

new createCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    229,
    '.menu .container',
    'menu__item'
).render();

new createCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
     но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
     550,
    '.menu .container',
    'menu__item'
).render();

new createCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко
     из миндаля, овса, кокоса или гречки, 
     правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
     430,
    '.menu .container',
    'menu__item'
).render();















 });

 

