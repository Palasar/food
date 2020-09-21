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
export default calculator;