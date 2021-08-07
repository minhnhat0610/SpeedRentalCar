$(document).ready(function(){
    
//Flat Picker for date input
$('#start-date').flatpickr({
    disableMobile: true,
    altInput: true,
    altFormat: 'm-d-Y',
    dateFormat: 'Y-m-d',
    minDate: 'today',
    defaultDate: 'today'
});
$('#end-date').flatpickr({
    disableMobile: true,
    altInput: true,
    altFormat: 'm-d-Y',
    dateFormat: 'Y-m-d',
    minDate: 'today',
    defaultDate: 'today'
});


// Vehicle name and price

let sportCar = [
    {
     name: 'mustang GT',
     price: 149.00,
    },
    {
     name: 'mercedes GLA convertible',
     price: 249.00,
    }
 ];

 let SedanCar = [
     {
      name: 'hyundai elentra',
      price: 39.00,
     },
     {
      name: 'ford focus',
      price: 59.00,
     }
  ];

  let SUVCar = [
     {
      name: 'hyundai sante',
      price: 100.00,
     },
     {
      name: 'mercedes GLC',
      price: 199.00,
     }
  ];

let selectedVehicle = $('.vehicle img').eq(0);
let vehicleName;
let vehiclePrice;
let otherAmount = 0;
$('.vehicle img').on('click',function(e){
    //hightlight the selected vehicle
    $('.vehicle img').removeClass('reserved-vehicle');
    $(e.currentTarget).addClass('reserved-vehicle');
    selectedVehicle = $(e.currentTarget);
})


let getVehicleInfor = (selectedVehicle) => {
    let vehicleTab = selectedVehicle.parents('.vehicles-tab');
    let tabIndex = $('.vehicles-tab').index(vehicleTab);
    let vehicleContainer = vehicleTab.children('.vehicle');
    let vehicleIndex = vehicleContainer.index(selectedVehicle.parents('.vehicle'));
    
    if(tabIndex == 0){
        vehicleName = sportCar[vehicleIndex].name;
        vehiclePrice = sportCar[vehicleIndex].price;
    }

    else if(tabIndex == 1){
        vehicleName = SedanCar[vehicleIndex].name;
        vehiclePrice = SedanCar[vehicleIndex].price;
    }

    else{
        vehicleName = SUVCar[vehicleIndex].name;
        vehiclePrice = SUVCar[vehicleIndex].price;
    }

    $('#vehicle-name').val(vehicleName);
    $('#vehicle-price').val('$'+vehiclePrice+'/day');

    return vehiclePrice;
}

let CalculateNumOfDays = ()=> {
    //get date value from the field
    let startDay = $('#start-date').val();
    let endDay = $('#end-date').val();

    //convert it to date type variable
    let convertedStartDay = new Date(startDay);
    let convertedEndDay = new Date(endDay);

    //calculate the time differents in days
    let numberOfDays = (convertedEndDay - convertedStartDay)/(24*60*60*1000)
    
    //output the number of days to the input field
    $('#num-of-day').val(numberOfDays);
    return numberOfDays;
}

let calculateTotal = () =>{
    //calculate sub total
    let rate = getVehicleInfor(selectedVehicle);    //get vehicle price
    let subTotal = CalculateNumOfDays() * rate;     // get number of rental days

    //calculate & output tax to screen
    let taxRate = 0.06
    let tax = subTotal * taxRate;
    $('#tax-amount').val('$'+tax);

    //Output other fees
    $('#other-fee').val('$'+otherAmount);

    //Calculate & output total amount
    let totalAmount = subTotal + otherAmount + tax;
    $('#total-amount').val('$'+totalAmount);
}




        let nextButtonMobile = (e) => {
            let currentProcessTab = $(e.currentTarget).parents('.process-tab');
            let nextProcessTab = $(e.currentTarget).parents('.process-tab').next();
            // expand process tab
            currentProcessTab.removeClass('active-tab');
            nextProcessTab.addClass('active-tab');  

            //expand and collapse process title
            currentProcessTab.children('.process-title').removeClass('active-process-title'); 
            nextProcessTab.children('.process-title').addClass('active-process-title');


            //show up the Go Back Button
            nextProcessTab.find('.go-back-button').addClass('active-back-btn');

            //Show and hide process content
            $('.process-content').css({
                opacity: 0,
            })
            nextProcessTab.children('.process-content').css({
                opacity: 1
            });
        }

        let backButtonMobile = (e) => {
            let currentProcessTab = $(e.currentTarget).parents('.process-tab');
            let prevProcessTab = $(e.currentTarget).parents('.process-tab').prev();
    
             // expand process tab
            currentProcessTab.removeClass('active-tab');
            prevProcessTab.addClass('active-tab');
    
            //expand and collapse process title
            currentProcessTab.children('.process-title').removeClass('active-process-title');
            prevProcessTab.children('.process-title').addClass('active-process-title');
    
            //show up the Go Back Button
            $(e.currentTarget).removeClass('active-back-btn');
            
            //Show and hide process content
            $('.process-content').css({
                opacity: 0,
            })
            prevProcessTab.children('.process-content').css({
                opacity: 1
            });
    
        }

        let nextButtonLaptop = (e) =>{
            let currentForeground = $(e.currentTarget).parents('.process-content').siblings('.blur-foreground');
            let nextForeground = $(e.currentTarget).parents('.process-tab').next().children('.blur-foreground');

            currentForeground.css({
                animationName: 'hideTab'
            })

            nextForeground.css({
                animationName: 'showTab'
            })


            $('.go-back-button').removeClass('active-back-btn');
            $(e.currentTarget).parents('.process-tab').next().find('.go-back-button').addClass('active-back-btn');

        }

        let backButtonLaptop = (e) =>{
            let currentForeground = $(e.currentTarget).parents('.process-title').siblings('.blur-foreground');
            let prevForeground = $(e.currentTarget).parents('.process-tab').prev().children('.blur-foreground');

            currentForeground.css({
                animationName: 'showTabReverse',
            })

            prevForeground.css({
                animationName: 'hideTabReverse'
            })

            $(e.currentTarget).removeClass('active-back-btn')
            $(e.currentTarget).parents('.process-tab').prev().find('.go-back-button').addClass('active-back-btn');


        }

        let checkFormValidity = (formSelector) =>{
            let formLength = formSelector.length;
            for(let i =0; i<formLength; i++){
                let isValid = formSelector.get(i).reportValidity()
                if(!isValid){
                    return false;
                }
        
                else{
                    return true;
                }
            }
        }

  
// click to next btn expand process tab 
let ScreenSize = $('body').width();
$('.next-btn').on('click',function(e){

    let formSelector = $(e.currentTarget).parents('.process-content').find('form');
        //Only slide to the next process when form validity is passed
    if(checkFormValidity(formSelector)){
            //slide to the next process
            if(ScreenSize < 1200){
                nextButtonMobile(e);
            }

            else{
                nextButtonLaptop(e);
            }
        
        calculateTotal();
    }

})


//click go back button to close process tab
$('.go-back-button').on('click', function(e){
    //go back to the previous process
    if(ScreenSize < 1200){
    backButtonMobile(e);
    }

    else{
        backButtonLaptop(e);
    }

})


$('.confirm-btn').on('click',function(){
    $('.loader-container').addClass('show-loader');
})


// end of Document ready call back
})


