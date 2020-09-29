// import { set } from "core-js/fn/dict";

// import { of } from "core-js/fn/array";

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const
        togglePrev = document.querySelector(prevArrow),
        toggleNext = document.querySelector(nextArrow),
        totlalCounter = document.querySelector(totalCounter),
        currentCounterr =  document.querySelector( currentCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        widthWrapper = window.getComputedStyle(sliderWrapper).width,
        containerForSlide = document.querySelector(container),
        dotsWrapper = document.createElement('div'),
        dot = document.createElement('div');
        

    let  allSlide = document.querySelectorAll(slide),
         lastSlide = allSlide[allSlide.length - 1],
         firstSlide = allSlide[0],
         cloneLastSlide = lastSlide.cloneNode(true),
         cloneFirstSlide = firstSlide.cloneNode(true),
          counterSlider = 1,
          index = 1,
          offset = deliteNotDigit(widthWrapper),
          allowShift = true;
   
     dotsWrapper.classList.add('carousel-indicators');
        
    for(let i = 1; i <= allSlide.length; i++) {
        dotsWrapper.innerHTML += `<div data-dot = '${i}' class = 'dot'></div>`; 
    }
    
    containerForSlide.append(dotsWrapper);

    const dots = document.querySelectorAll('.dot');

    

    sliderField.append(cloneFirstSlide);
    sliderField.prepend(cloneLastSlide);

    allSlide = document.querySelectorAll(slide);

    allSlide.forEach(slide => slide.style.width = widthWrapper);

   

    sliderField.style.cssText = `
            width:  ${100 * allSlide.length}%;
            display: flex;
    `;

   

    sliderWrapper.style.overflow = 'hidden';



    if(allSlide.length < 10) {
        totlalCounter.textContent = `0${allSlide.length - 2}`;
    }else{
        totlalCounter.textContent = allSlide.length - 2;
    }

    currentCounterr.textContent = `0${counterSlider}`;
    sliderField.style.transform = `translateX(-${offset}px)`;
    document.querySelector(`[data-dot = '${counterSlider}' ]`).classList.add('activeDot');  

    function toggleSlide () {
      
            sliderField.classList.add('shiftSlide');
            sliderField.style.transform = `translateX(-${offset}px)`;
       
      
        
    }

    
    function deliteNotDigit(str){
        return Math.round(+str.replace(/[A-Za-z]/g, '')) ;
    }
                                  
    sliderField.addEventListener('transitionend', () => {

        sliderField.classList.remove('shiftSlide');

        if(index == allSlide.length - 1){
             index = 1;
             offset = deliteNotDigit(widthWrapper);
             sliderField.style.transform = `translateX(-${offset}px)`;
       
        }else if(index == 0){
            index = allSlide.length - 2;
            offset = deliteNotDigit(widthWrapper) * (allSlide.length - 2);
            sliderField.style.transform = `translateX(-${offset}px)`;
        }

        allowShift = true;
    });

    toggleNext.addEventListener('click', () => {
       if(allowShift){
        ++index;
        offset += deliteNotDigit(widthWrapper);

        ++counterSlider;
        
        if(counterSlider == allSlide.length - 1 ){
             counterSlider = 1;
             currentCounterr.textContent = counterSlider;
        }else{
            currentCounterr.textContent = counterSlider;  
        }
        if(counterSlider < 10) {
            currentCounterr.textContent = `0${counterSlider}`;
        }
        toggleSlide ();
        dots.forEach(dot => dot.classList.remove('activeDot'));
        document.querySelector(`[data-dot = '${counterSlider}' ]`).classList.add('activeDot'); 

        allowShift = false;
       }
    });

    togglePrev.addEventListener('click', () => {   
     if(allowShift){
        --index; 
        offset -= deliteNotDigit(widthWrapper);
        
        --counterSlider;
        
        if(counterSlider == 0){
            counterSlider = allSlide.length - 2;
            currentCounterr.textContent = counterSlider;
        }else{
            currentCounterr.textContent = counterSlider; 
        }
        if(counterSlider < 10) {
            currentCounterr.textContent = `0${counterSlider}`;
        }
        toggleSlide ();
        dots.forEach(dot => dot.classList.remove('activeDot'));
        document.querySelector(`[data-dot = '${counterSlider}' ]`).classList.add('activeDot');
     }
     allowShift = false;
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