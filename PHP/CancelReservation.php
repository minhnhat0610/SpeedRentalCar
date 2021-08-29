<?php 
session_start();
//=============== varible declaration===================
$confirmation = $_SESSION['confirmation-code'];


//===============Server variable========================

$servername = 'speedcarrental.c35o65xnf5yg.us-east-2.rds.amazonaws.com';
$username = 'corydang0610';
$password = 'nhat06101998';
$dbname = 'speedcarrental';
try{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    //========== set the PDO error mode to exception===========
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_TIMEOUT, 60);

    // =============== Delete Invoice =====================

    try{
        if(isset($confirmation)){
            $deleteInvoice = $conn -> prepare('DELETE
            from Invoice
            where Confirmation = :confirmation');

            $deleteInvoice -> bindParam(':confirmation', $confirmation);
            $deleteInvoiceSuccessfully = $deleteInvoice -> execute();
        }
    }

    catch(exception $e){
        echo $e->getMessage();
    }

    // =============== Delete reservation ================

    try{
        if(isset($confirmation)){
            $deleteReservation = $conn -> prepare('DELETE
            from Reservation
            Where Confirmation = :confirmation');

            $deleteReservation -> bindParam(":confirmation", $confirmation);
            $deleteSucessfully = $deleteReservation -> execute();

            if($deleteSucessfully){
                echo 'delete successfully';
            }

            else{
                throw new exception('Error: Unable to delete reservation. Please try again!');
            }
        }
    }

    catch(exception $e){
        echo $e->getMessage();
    }

}

catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }