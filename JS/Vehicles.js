$(document).ready(function(){


    //click event on vehicles navigation
    const sportIcon = "Photos/car-icons/sport-car.png";
    const sportIconSelected = "Photos/car-icons/sport-car-selected.png";

    const sedanIcon = "Photos/car-icons/sedan.png";
    const sedanIconSelected = "Photos/car-icons/sedan-selected.png";

    const suvIcon = "Photos/car-icons/suv.png";
    const suvIconSelected = "Photos/car-icons/suv-selected.png";

    $('#sport-icon').on('click',function(e){
        $(this).attr('src',sportIconSelected);  //highlight the navigation icon 
        $('#sedan-icon').attr('src',sedanIcon);
        $('#suv-icon').attr('src',suvIcon);

        $('#sport-cars-tab').removeClass('hide-tab'); //show the vehicle tab base body type
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


    //Load vehicle information
    let sportCar = [
       {
        passenger: 2,
        bags: 4,
        transmission: 'Automatic',
        bodyType: 'Coupe',
        engine: '4 cly 4.0L',
        MPG: '20/28',
        name: 'mustang',
        price: 149.00,
       },
       {
        passenger: 2,
        bags: 4,
        transmission: 'Automatic',
        bodyType: 'Coupe',
        engine: '6 cly 5.0L',
        MPG: '18/25',
        name: 'mer-sport',
        price: 249.00,
       }
    ];

    let SedanCar = [
        {
         passenger: 4,
         bags: 5,
         transmission: 'Automatic',
         bodyType: 'Sedan',
         engine: '4 cly 2.0L',
         MPG: '28/30',
         name: 'hyu-sedan',
         price: 39.00,
        },
        {
         passenger: 5,
         bags: 5,
         transmission: 'Automatic',
         bodyType: 'Sedan',
         engine: '4 cly 3.2L',
         MPG: '24/29',
         name: 'ford',
         price: 59.00,
        }
     ];

     let SUVCar = [
        {
         passenger: 5,
         bags: 7,
         transmission: 'Automatic',
         bodyType: 'SUV',
         engine: '6 cly 3.0L',
         MPG: '18/25',
         name: 'hyu-suv',
         price: 100.00,
        },
        {
         passenger: 7,
         bags: 8,
         transmission: 'Automatic',
         bodyType: 'SUV',
         engine: '6 cly 4.2L',
         MPG: '17/26',
         name: 'mer-suv',
         price: 199.00,
        }
     ];

    const InforDetailLength = $('.infor-detail').length;
    console.log(InforDetailLength);

    let LoadVehicleInfor = (vehicleIndex, vehicleArray) => {
        let extractedInfor = [];
       $.each(vehicleArray[vehicleIndex], function(key, value){
           extractedInfor.push(value)
       })

       $.each($('.infor-detail p'),function(key){
            $(this).text(extractedInfor[key]);
       })

       $('.rate p').text('$' + vehicleArray[vehicleIndex].price + '/day');

    }

    //function to change source and animation for Selected vehicle display

    let updateSelectedVehicle = (source) => {
        $('.selected-vehicle img').attr('src',source);


        //Restart animation
        $('.selected-vehicle img').removeClass('show-selected-vehicle');

        $('.selected-vehicle img').outerWidth();    //triger a reflow

        $('.selected-vehicle img').addClass('show-selected-vehicle');
    }


    //click to select SPORT vehicles
    $('#sport-cars-tab .vehicle img').on('click',function(e){
        let source = $(e.currentTarget).attr('src');    //change image source for selected vehicle
        updateSelectedVehicle(source);

        let vehicleIndex =  $('#sport-cars-tab .vehicle').index($(e.currentTarget).parent());
        LoadVehicleInfor(vehicleIndex, sportCar);

    })

    //click to select SEDAN vehicles
    $('#sedan-tab .vehicle img').on('click',function(e){
        let source = $(e.currentTarget).attr('src');    //change image source for selected vehicle
        updateSelectedVehicle(source);

        let vehicleIndex =  $('#sedan-tab .vehicle').index($(e.currentTarget).parent());
        LoadVehicleInfor(vehicleIndex, SedanCar);

    })

    //click to select SUV vehicles
    $('#suv-tab .vehicle img').on('click',function(e){
        let source = $(e.currentTarget).attr('src');    //change image source for selected vehicle
        updateSelectedVehicle(source);

        let vehicleIndex =  $('#suv-tab .vehicle').index($(e.currentTarget).parent());
        LoadVehicleInfor(vehicleIndex, SUVCar);

    })


    //Click button on footer to scroll top of the page
    $('.page-footer button').on('click',function(){
        $('html, body').animate({
            scrollTop: 0
        },1000)
    })


    
})