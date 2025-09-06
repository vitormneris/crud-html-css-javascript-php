<?php 

namespace App\usuarios;

require "../vendor/autoload.php";

use App\Controller\UserController;

$usuarioController = new UserController();

$body = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : '';

switch ($_SERVER["REQUEST_METHOD"]) {
case "GET":
    if ($id == "") {
        $resultado = $usuarioController->findAll();
        echo json_encode(value: ["status" => true, "data" => $resultado]);
    } else {
        $resultado = $usuarioController->findAllById(id: $id);
        echo json_encode(value: ["status" => true, "data" => $resultado]);
    }
    break;
case "POST":
    $resultado = $usuarioController->insert(data: $body);
    echo json_encode(value: ["status" => $resultado]);
    break;
case "PUT":
    $resultado = $usuarioController->update(
        newData: $body,
        userId: intval(value: $id)
    );
    echo json_encode(value: ["status" => $resultado]);
    break;
case "DELETE":
    $resultado = $usuarioController->delete(id: intval(value: $id));        
    echo json_encode(value: ["status" => $resultado]);
    break; 
}
