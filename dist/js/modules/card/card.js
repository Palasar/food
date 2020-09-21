   // class for card 
import {getResource} from '../../services/services';
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
    

    
    getResource('http://localhost:3000/menu')
        .then( data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new createCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}
export default card;