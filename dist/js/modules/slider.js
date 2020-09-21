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
export default  slider;