<?php
//=============== varible declaration===================
$confirmation = $_POST['confirmation-code'];

//===============Server variable========================

$servername = 'speedcarrental.c35o65xnf5yg.us-east-2.rds.amazonaws.com';
$username = 'corydang0610';
$password = 'nhat06101998';
$dbname = 'speedcarrental';
try{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_TIMEOUT, 60);

    $findVehicle = $conn -> prepare('SELECT VehicleInfor.VehicleName
    from VehicleInfor
    INNER Join Reservation ON Reservation.VehicleID = VehicleInfor.VehicleID
    Where Confirmation = :confirmation');

    $findVehicle -> bindParam(':confirmation', $confirmation);
    $findVehicle -> execute();
    $findVehicleResult = $findVehicle -> fetch(PDO::FETCH_ASSOC);

    try{
        if($findVehicleResult){
            echo $findVehicleResult['VehicleName'];
        }
    
        else{
            throw new exception('Vehicle not found');
        }
    
    }

    catch(exception $e){
        echo $e->getMessage();
    }
}

catch(PDOException $e){
    echo "Connection fail: " .  $e->getMessage();
}