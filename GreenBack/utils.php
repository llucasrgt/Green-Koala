<?php 
     error_reporting(E_ALL);
    ini_set('display_errors', 1);
    require 'vendor/autoload.php';
    use Kreait\Firebase\Configuration;
    use Kreait\Firebase\Firebase;

     
    const DEFAULT_URL = 'https://greenkoala-c4317.firebaseio.com';
    const DEFAULT_TOKEN = 'AIzaSyBYZx2lofAGH_85_tR7AFyYYkL63AGIjGg';

    $config = new Configuration();
    $config->setFirebaseSecret(DEFAULT_TOKEN );

    $firebase = new Firebase(DEFAULT_URL , $config);



    function getData($local){
        global $firebase;
        return $firebase->get($local);
    }


?>