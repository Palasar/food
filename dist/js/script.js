    import calaculator  from'./modules/calculator';
    import card  from'./modules/card';
    import form  from'./modules/form';
    import modal  from'./modules/modalWindow';
    import tabs  from'./modules/tabs';
    import slider  from'./modules/slider';
    import timer  from'./modules/timer';
    import  openModalWindow from './modules/modalWindow';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout( () => openModalWindow('.modal', modalTimerId ), 300000);

    calaculator();
    card();
    form('form');
    modal('.modal', '[data-modal]', modalTimerId);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2022-06-11');

});


