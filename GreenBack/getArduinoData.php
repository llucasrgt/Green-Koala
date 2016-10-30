<?php 
    require("utils.php");
    require("config.php");
    //$result = $firebase->get('teste2');

    //$result = getData('temperatura');
    //print_r($result);

    if (isset($_REQUEST)){
        //print_r($_GET);
        //$data = Array("key" => "value");
        $time;
	$terminal;
        foreach ($_REQUEST as  $key => $value){
            switch($key){
                case UMIDADE_AR:
                    $data[UMIDADE_AR] = $value;
                break;
                case UMIDADE_TERRA:
                    //array_push($data, UMIDADE_TERRA, $value);
                    $data[UMIDADE_TERRA] = $value;
                break;
                case TEMPERATURA:
                    //array_push($data, TEMPERATURA,  $value);
                    $data[TEMPERATURA] = $value;
                break;
                case LUMINOSIDADE:
                    //array_push($data, TEMPERATURA,  $value);
                    $data[LUMINOSIDADE] = $value;
                break;
                case DIRECAO_VENTO:
                    //array_push($data, TEMPERATURA,  $value);
                    $data[DIRECAO_VENTO] = $value;
                break;
                case VELOCIDADE_VENTO:
                    //array_push($data, TEMPERATURA,  $value);
                    $data[VELOCIDADE_VENTO] = $value;
                break;
	        case TERMINAL:
		    //array_push($data, TEMPERATURA,  $value);
		    $terminal = $value;
                    //$data[TERMINAL] = $value;
                break;
		case TIME:
		    //array_push($data, TEMPERATURA,  $value);
		    //$data[TIME] = $value;
		    $time = $value;
                break;
                default:
                    die("Dado invalido");
            }
        }
    
        print_r($data);
        $firebase -> update([
            "data" => $data,
        ], 'dados/'.$time);


	$firebase -> update([
		        "terminal" => $terminal,
		    ], 'dados/'.$time);

    }

?>
