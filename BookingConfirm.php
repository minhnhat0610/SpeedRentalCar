<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservation Confirm</title>
    <link href="./Photos/Logo/Logo.png" rel="icon">
    <link href="./CSS/Navigation.css" rel="stylesheet" />
    <link href="./CSS/BookingConfirm.css" rel="stylesheet" />
</head>
<body>
    <div class="nav-container">
        <img class="company-logo" src="Photos/Logo/Logo.png"/>
        <div class="mobile-menu-icon">
            <span class="first regular"></span>
            <span class="regular"></span>
            <span class="regular"></span>
        </div>
        <div class="laptop-nav">
            <nav>
                <ul>
                    <li><a href="index.html" class="active-page">Home</a></li>
                    <span></span>
                    <li><a href="vehicles.html">All Vehicles</a></li>
                    <span></span>
                    <li><a href="ReservationBooking.html">Book Us</a></li>
                    <span></span>
                    <li><a href="ManageReservation.html">Manage Reservation</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="mobile-nav hide-menu">
        <nav>
            <ul>
                <li class="roll-up"><a href="index.html" class="active-page">Home</a></li>
                <span></span>
                <li class="roll-up"><a href="vehicles.html">All Vehicles</a></li>
                <span></span>
                <li class="roll-up"><a href="ReservationBooking.html">Book Us</a></li>
                <span></span>
                <li class="roll-up"><a href="ManageReservation.html">Manage Reservation</a></li>
                <li class="roll-up"><a href=""></a></li>

            </ul>
        </nav>
    </div>

    <div class="body-content">
        <div class="gratitude-container">
            <div class="gratitude-logo">
                <img src="./Photos/Logo/Logo.png" />
            </div>

            <div class="gratitude-content">
                <div>
                    <p class="gratitude-statement">thank you for choosing us</p>
                    <p class="confirmation">your booking has been confirmed with confirmation code
                         <span class="confirmation-code">
                         <?php
                            echo $_SESSION['confirmation'];
                            ?>
                         </span>
                    </p>    
                </div>

                <div class="extra-infor">
                    <p>You can manage your reservation at <a href="./ManageReservation.html">Manage reservation</a></p>
                    <p>Contact us if you have any question <a href="tel:+15021593578">+1 (502)-159-3578</a></p>
                </div>
            </div>
        </div>
    </div>


    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/e23e09cf11.js" crossorigin="anonymous"></script>
<script src="JS/navigation.js"></script>
<script src="./JS/BookingConfirm.js"></script>

</body>
</html>