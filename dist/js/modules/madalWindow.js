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
export default  modal;

export {closeModalWindow, openModalWindow};