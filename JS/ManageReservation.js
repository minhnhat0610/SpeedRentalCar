$(document).ready(function(){
    $('.submit-button').on('click',function(e){
        e.preventDefault();
        let form = $(this).parents('form');
        // check input validity
        let isValid = form.get(0).reportValidity()
        // display loader after click if valid input
        if(isValid){
            $('.loader').addClass('loading');


            // wait until content is loaded in background before reveal it
            RevealLayout();
        }
    })

    let RevealLayout= () => {
        //Change layout for Laptop
        $('.body-inner-container').removeClass('first-loading');
        $('.form-container').removeClass('active-form');

        //Change layout for mobile
        let CustomerContainerOffset = $('.customer-infor-container').offset().top;
            
            $('.body-content').css({
                height: 'auto'
            })
            $('html, body').animate({
                scrollTop: CustomerContainerOffset
            },500)


        //reveal content for both laptop and mobile
        $('.customer-infor-container').removeClass('hide-customer-container');
        $('.vehicle-infor-container').removeClass('hide-vehicle-container');

        
    }

})