$(document).ready(function(){
    //click event on vehicles navigation
    const sportIcon = "Photos/car-icons/sport-car.png";
    const sportIconSelected = "Photos/car-icons/sport-car-selected.png";

    const sedanIcon = "Photos/car-icons/sedan.png";
    const sedanIconSelected = "Photos/car-icons/sedan-selected.png";

    const suvIcon = "Photos/car-icons/suv.png";
    const suvIconSelected = "Photos/car-icons/suv-selected.png";

    $('#sport-icon').on('click',function(e){
        $(this).attr('src',sportIconSelected);
        $('#sedan-icon').attr('src',sedanIcon);
        $('#suv-icon').attr('src',suvIcon);

        $('#sport-cars-tab').removeClass('hide-tab');
        $('#sedan-tab').addClass('hide-tab');
        $('#suv-tab').addClass('hide-tab');

    })

    $('#sedan-icon').on('click',function(e){
        $(this).attr('src',sedanIconSelected);
        $('#sport-icon').attr('src',sportIcon);
        $('#suv-icon').attr('src',suvIcon);

        $('#sedan-tab').removeClass('hide-tab');
        $('#sport-cars-tab').addClass('hide-tab');
        $('#suv-tab').addClass('hide-tab');
    })

    $('#suv-icon').on('click',function(e){
        $(this).attr('src',suvIconSelected);
        $('#sedan-icon').attr('src',sedanIcon);
        $('#sport-icon').attr('src',sportIcon);

        $('#suv-tab').removeClass('hide-tab');
        $('#sedan-tab').addClass('hide-tab');
        $('#sport-cars-tab').addClass('hide-tab');
    })


    //click to select vehicles
    $('.vehicle img').on('click',function(e){
        let source = $(e.currentTarget).attr('src');
        $('.selected-vehicle img').attr('src',source);


        //Restart animation
        $('.selected-vehicle img').removeClass('show-selected-vehicle');

        $('.selected-vehicle img').outerWidth();    //triger a reflow

        $('.selected-vehicle img').addClass('show-selected-vehicle');

    })
})