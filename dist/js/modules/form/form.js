import {openModalWindow, closeModalWindow} from '../modalWindow/madalWindow';
import {postForm} from '../../services/services';

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

            postForm('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
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
                closeModalWindow('.modal');
            }, 4000);
    }
}
export default forms;