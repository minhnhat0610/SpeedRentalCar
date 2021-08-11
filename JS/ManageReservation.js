$(document).ready(function(){
    $('.submit-button').on('click',function(e){
        e.preventDefault();
        let form = $(this).parents('form');
        // check input validity
        let isValid = form.get(0).reportValidity()
        // display loader after click if valid input
        if(isValid){
            $('.loader').addClass('loading');
        }
    })
})