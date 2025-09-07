<?php 

namespace app\routes;

require "../../vendor/autoload.php";

use app\controller\UserController;

$usuarioController = new UserController();

$body = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : '';

switch ($_SERVER["REQUEST_METHOD"]) {
case "GET":
    if ($id == "") {
        $resultado = $usuarioController->findAll();
        if ($resultado == []) {
            echo json_encode(["status" => false, "data" => $resultado]);
            break;
        }
        echo json_encode(["status" => true, "data" => $resultado]);
    } else {
        $resultado = $usuarioController->findById($id);
        if ($resultado == []) {
            echo json_encode(["status" => false, "data" => $resultado]);
            break;
        }
        echo json_encode(["status" => true, "data" => $resultado]);
    }
    break;
case "POST":
    $resultado = $usuarioController->insert($body);
    echo json_encode(["status" => $resultado]);
    break;
case "PUT":
    $resultado = $usuarioController->update($body, intval($id));
    echo json_encode(["status" => $resultado]);
    break;
case "DELETE":
    $resultado = $usuarioController->delete(intval($id));        
    echo json_encode(["status" => $resultado]);
    break; 
}
