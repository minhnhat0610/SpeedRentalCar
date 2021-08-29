$(document).ready(function(){
    // Reveal content after loading
    $('.gratitude-logo').css({
        transform: 'scale(1,1)'
    })

    $('.gratitude-container').css({
        transform: 'scale(1,1)'
    })

    $('.gratitude-content').css({
        opacity: 1,
    })

    $('.gratitude-statement').css({
        transform: 'translateY(0%)'
    })

    // // Retrieve confirmation code from the sever
    // $.ajax({
    //     type: 'post',
    //     data: "",
    //     url: './PHP/BookingConfirm.php',
    //     success: function(data){
    //         console.log('send successfully');
    //         console.log(data);
    //         // $('.confirmation-code').text(data);
    //     },
    //     error: function(jqXHR, textStatus, errorMessage){
    //         console.log(errorMessage);
    //     }
    // })
})