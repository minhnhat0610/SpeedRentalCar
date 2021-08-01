$(document).ready(function(){
    // click to next btn expand process tab 
    $('.next-btn').on('click',function(e){
        $(e.currentTarget).parents('.process-tab').removeClass('active-tab');
        $(e.currentTarget).parents('.process-tab').next().addClass('active-tab');

        $(e.currentTarget).parents('.process-tab').children('.process-title').removeClass('active-process-title');
        $(e.currentTarget).parents('.process-tab').next().children('.process-title').addClass('active-process-title');

        $(e.currentTarget).parents('.process-tab').next().find('.go-back-button').addClass('active-back-btn');

    })

    //click go back button to close process tab
    $('.go-back-button').on('click', function(e){
        $(e.currentTarget).parents('.process-tab').removeClass('active-tab');
        $(e.currentTarget).parents('.process-tab').prev().addClass('active-tab');

        $(e.currentTarget).parents('.process-tab').children('.process-title').removeClass('active-process-title');
        $(e.currentTarget).parents('.process-tab').prev().children('.process-title').addClass('active-process-title');

        $(e.currentTarget).removeClass('active-back-btn');


    })
})