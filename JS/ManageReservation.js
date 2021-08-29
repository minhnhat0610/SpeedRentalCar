$(document).ready(function(){
    // ==================== Define Vehicle objects=====================
    let vehicle = [
        {
            name: 'Mustang GT',
            source: './Photos/Sport/mustang.png',
        },

        {
            name: 'Mercedes GLA Convertible',
            source: './Photos/Sport/Mer-sport.png',
        },
        {
            name: 'Hyundai Elentra',
            source: './Photos/Sedan/Hyu-white.png',
        },
        {
            name: 'Ford Focus',
            source: './Photos/Sedan/ford.png',
        },

        {
            name: 'Hyundai Sante',
            source: './Photos/SUV/hyu-suv.png',
        },
        {
            name: 'Mercedes GLC',
            source: './Photos/SUV/Mer-suv.png',
        },
        
    ];
    // ==================== Sumbit button click function================
    $('.submit-button').on('click',function(e){
        e.preventDefault();
        let form = $(this).parents('form');
        // check input validity
        let isValid = form.get(0).reportValidity()
        // display loader after click if valid input
        if(isValid){
            $('.loader').addClass('loading');
            let serializedData = $('.form-container form').serialize();
            SendDataToServer(serializedData);
        }
    })

    let SendDataToServer = (serializedData)=>{
        $.ajax({
            type: 'post',
            url: './PHP/ManageReservation.php',
            data: serializedData,
            success: function(data){
                console.log('Transfer Successfully!');
                if(data.startsWith('Error')){
                    $('.error-message').text(data);
                    $('.error-message').css({display: 'block'});
                    TurnOffLoadingButton();
                }
                else{
                        // diplay data to screen
                        getVehicleInfor(serializedData);
                        let dataLoadComplete = DisplayData(data);
                        // wait until content is loaded in background before reveal it
                        if(dataLoadComplete){
                            RevealLayout();
                            TurnOffLoadingButton();
                        }

                }

            },
            error: function(jqXHR, textStatus, errorMessage){
                console.log(errorMessage);
            }
        })
    }

    let DisplayData = (data) => {
        $splitedArray = data.split('&');
        $numOfInputField = $('.customer-infor-container input').length;
        for(let i = 0 ; i < $numOfInputField ; i++){
            $('.customer-infor-container input').eq(i).val($splitedArray[i]);
        } 
        return true
    }

    let RevealLayout= () => {
        //turn off error message 
        $('.error-message').css({display: 'none'});

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

    let TurnOffLoadingButton = () => {
        //Turn off loading animation
        $('.loader').removeClass('loading');

    }

    let getVehicleInfor = (serializedData) => {
        $.ajax({
            type:'post',
            data: serializedData,
            url: './PHP/GetVehicleInfor.php',
            success: function(data){
                console.log('transfer vehicle successful!');
                console.log(data);
                displayVehicle(data, vehicle);
                return true;
            },

            error: function(jqXHR, textStatus, errorMessage){
                console.log(errorMessage);
                return false;
            }

        })
    }

    let displayVehicle = (VehicleName, vehicle) => {
        let vehicleSource;
        let vehicleLength = vehicle.length;
        for(let i = 0; i < vehicleLength; i++){
            if(vehicle[i].name == VehicleName){
                console.log(vehicle[i]);
               vehicleSource = vehicle[i].source;
               break;
            }
        }
        $('.vehicle-image').attr('src',vehicleSource);
        $('.vehicle-name').text(VehicleName);
    }


    // ================= Cancel Button function ========================
    $('.cancel-button').on('click',function(){
        DisplayCancelBox();
    })

    let DisplayCancelBox = () => {
        $('.cancel-confirm-box').css({display: 'flex'});
        let confirmBoxOffsetTop = $('.inner-box').offset().top;

        $('html, body').animate({
            scrollTop: confirmBoxOffsetTop
        },500)


    }

    $('#yes-button').on('click',function(){
        let serverResponse = SendCancelData();

        if(serverResponse = 'delete successfully'){
            alert("You have canceled your reseravtion successfully!");
            location.reload();
        }

        else{
            alert("Unable to delete reservation. Please try again!");
        }
    })

    let SendCancelData = () =>{
        $.ajax({
            type: 'post',
            url: './PHP/CancelReservation.php',
            data: '',
            success: function(data){
                return data
            },
            error: function(jqXHR, textStatus, errorMessage){
                console.log(errorMessage);
                return errorMessage;
            }

        })
    }

    $('#no-button').on('click',function(){
        $('.cancel-confirm-box').css({display: 'none'});

    })
})