<?php
session_start();
//=============== varible declaration===================
$pickupLocation = $_POST['pick-up-selection'];
$dropOffLocation = $_POST['drop-off-selection'];

$startDate = $_POST['start-date'];
$endDate = $_POST['end-date'];

$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$age = $_POST['age-selection'];
$email = $_POST['email'];
$phone = $_POST['phone-number'];

$vehicleName = strtolower($_POST['vehicle-name']);
$numOfDay = $_POST['num-of-day'];
$taxAmount = $_POST['tax-amount'];
$otherFee = $_POST['other-fee'];
$totalAmount = $_POST['total-amount'];

//===============Server variable========================

$servername = 'speedcarrental.c35o65xnf5yg.us-east-2.rds.amazonaws.com';
$username = 'corydang0610';
$password = 'nhat06101998';
$dbname = 'speedcarrental';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    //========== set the PDO error mode to exception===========
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_TIMEOUT, 60);
//     echo "Connected successfully";

// echo "\n";

//===================Find vehicle ID base on its name ========================
$findVehicleID = $conn->prepare('SELECT VehicleID FROM VehicleInfor Where VehicleName = :VehicleName');
$findVehicleID -> bindParam(':VehicleName', $vehicleName);
$findVehicleID -> execute();

$vehicleIDResult = $findVehicleID -> fetch(PDO::FETCH_ASSOC);
$vehicleID = $vehicleIDResult['VehicleID'];
// echo $vehicleID;

// =================== Retrieve existed CustomerID base on Email=================
$findExistedCustomerID = $conn -> prepare('SELECT CustomerID
 from Customer Where Email = :email');
$findExistedCustomerID -> bindParam(':email', $email);
$findExistedCustomerID -> execute();

$existedCutomerID = $findExistedCustomerID -> fetch(PDO::FETCH_ASSOC);


function IncreaseNewID($currentID, $prefix){
    $numberTag = str_replace($prefix,'',$currentID);
    $convertedNumber = intval($numberTag);

    $newID = $prefix . strval($convertedNumber+=1);
    return $newID;
}


$dateTime = date('Y-m-d H:i:s');

if(!$existedCutomerID){
        //====================== Retrieve current CustomerID=======================

        $findCustomerID = $conn -> prepare('SELECT CustomerID From Customer Order by CreatedTime desc');
        $findCustomerID -> execute();

        $customerIDResult = $findCustomerID -> fetch(PDO::FETCH_ASSOC);
    
    
    if(!$customerIDResult){
        $customerID = 'CUS1';
    }

    else{
        $customerID = $customerIDResult['CustomerID'];
        $customerID = IncreaseNewID($customerID,'CUS');
    }

    // ======================Insert New Customer Record====================

            $insertNewCustomer = $conn -> prepare('INSERT into Customer
            Values (:customerID,:firstname,:lastname,:age,:email,:phone, :createdTime)');
            $insertNewCustomer -> bindParam(':customerID',$customerID);
            $insertNewCustomer -> bindParam(':firstname',$firstName);
            $insertNewCustomer -> bindParam(':lastname',$lastName);
            $insertNewCustomer -> bindParam(':age',$age);
            $insertNewCustomer -> bindParam(':email',$email);
            $insertNewCustomer -> bindParam(':phone',$phone);
            $insertNewCustomer -> bindParam(':createdTime',$dateTime);
            $completeCustomerInsert = $insertNewCustomer -> execute();

}

else{
    $customerID = $existedCutomerID['CustomerID'];
    $completeCustomerInsert = true;
}


// ===============Insert new reservation==========================

function GenerateConfirmation($strLength){
    $result = '';
    for($i = 0; $i < $strLength; $i++){
        $result .= chr(rand(65,90));
    }
    return $result;
}

$confirmationLength = 6;
$_SESSION['confirmation'] = GenerateConfirmation($confirmationLength);

$confirmation = $_SESSION['confirmation'];

$insertReservation = $conn -> prepare('INSERT into Reservation 
Values (:confirmation, :startDate, :endDate, :pickup, :dropoff, :customerID, :vehicleID, :createdTime)');

$insertReservation -> bindParam(':confirmation',$confirmation);
$insertReservation -> bindParam(':startDate',$startDate);
$insertReservation -> bindParam(':endDate',$endDate);
$insertReservation -> bindParam(':pickup',$pickupLocation);
$insertReservation -> bindParam(':dropoff',$dropOffLocation);
$insertReservation -> bindParam(':customerID',$customerID);
$insertReservation -> bindParam(':vehicleID',$vehicleID);
$insertReservation -> bindParam(':createdTime',$dateTime);

$completeReservationInsert;
if($completeCustomerInsert){
    $completeReservationInsert = $insertReservation -> execute();
}

//==================Retrieve Last InvoiceID ======================

$findInvoiceID = $conn -> prepare('SELECT InvoiceID from Invoice Order by CreatedTime desc');
$findInvoiceID -> execute();

$resultInvoiceID = $findInvoiceID -> fetch(PDO::FETCH_ASSOC);

if(!$resultInvoiceID){
    $invoiceID = 'INV1';
}
else{
    $invoiceID = $resultInvoiceID['InvoiceID'];
    $invoiceID = IncreaseNewID($invoiceID, 'INV');
}

// =======================Insert New Invoice============================
function convertMoney($amount){
    $returnAmount = substr($amount,1);
    return floatval($returnAmount);
}
$convertedTotal = convertMoney($totalAmount);
$insertInvoice = $conn -> prepare('INSERT INTO Invoice 
Values (:invoiceID, :total, :vehicleID, :customerID, :confirmation, :createdTime)');

$insertInvoice -> bindParam(':invoiceID', $invoiceID);
$insertInvoice -> bindParam(':total',$convertedTotal);
$insertInvoice -> bindParam(':vehicleID', $vehicleID);
$insertInvoice -> bindParam(':customerID', $customerID);
$insertInvoice -> bindParam(':confirmation', $confirmation);
$insertInvoice -> bindParam(':createdTime',$dateTime);


if($completeReservationInsert){
    $insertInvoice -> execute();
    echo 'success';
}
// ================ End of Connection========================
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }

