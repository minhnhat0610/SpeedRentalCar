<?php
session_start();
//=============== varible declaration===================
$confirmation = $_POST['confirmation-code'];
$_SESSION['confirmation-code'] = $confirmation;
$lastName = $_POST['input-last-name'];

//===============Server variable========================

$servername = 'speedcarrental.c35o65xnf5yg.us-east-2.rds.amazonaws.com';
$username = 'corydang0610';
$password = 'nhat06101998';
$dbname = 'speedcarrental';
try{
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn->setAttribute(PDO::ATTR_TIMEOUT, 60);

//====================== Look up reservation============
$reservationFound;
$reservationToString;
$ReservationIsCompleted = false;
if(isset($confirmation)){
    $findReservation = $conn -> prepare('SELECT PickupLocation, Destination, 
    date_format(StartDate, "%m-%d-%Y") as StartDate, date_format(EndDate, "%m-%d-%Y") as EndDate
    FROM Reservation
    Where Confirmation = :confirmation');

    $findReservation -> bindParam(':confirmation', $confirmation);
    $reservationFound = $findReservation -> execute();

    $reservation = $findReservation -> fetch(PDO::FETCH_ASSOC);

    try{
        if($reservation){
            $reservationToString = implode('&',$reservation);
            $ReservationIsCompleted = true;
        }
    
        else{
            throw new exception('Error: Reservation not found');
        }
    
    }

    catch(exception $e){
        echo $e->getMessage();
    }
}

//================= Find CustomerID base on Confirmation=============
$customerID;

if($ReservationIsCompleted){
    $findCustomerID = $conn -> prepare('SELECT CustomerID
    From Reservation where Confirmation = :confirmation');

    $findCustomerID -> bindParam(':confirmation', $confirmation);
    if($findCustomerID -> execute()){
        $result = $findCustomerID -> fetch(PDO::FETCH_ASSOC);
        $customerID = $result['CustomerID'];
    }

    else{
        throw new exception('Error: Customer not found');;
    }

}


// ====================Look up Customer Information================
$customerInforString;
if(isset($customerID)){
    $findCustomerInfor = $conn -> prepare('SELECT FirstName, LastName, Age, Email, Phone 
    from Customer 
    where CustomerID = :customerID');
    $findCustomerInfor -> bindParam(':customerID', $customerID);
    $findCustomerInfor -> execute();
    
    $customerInfor = $findCustomerInfor -> fetch(PDO::FETCH_ASSOC);
    $customerInforString = implode('&',$customerInfor);
}


//================ Output data to Client===============
if(isset($customerInforString) && isset($reservationToString)){
    echo $customerInforString . '&' . $reservationToString;
}


}

catch(PDOException $e){
    echo "Connection fail: " .  $e->getMessage();
}
?>