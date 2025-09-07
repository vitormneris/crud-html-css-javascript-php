<?php 

namespace app\routes;

require "../../vendor/autoload.php";

use app\controller\UserController;

$usuarioController = new UserController();

$body = json_decode(
    json: file_get_contents(filename: 'php://input'), 
    associative: true
);
$id = isset($_GET['id']) ? $_GET['id'] : '';
echo "OXIPORRA"; 

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
    echo "OXIPORRA"; 
    $resultado = $usuarioController->insert(data: $body);
    echo "VERDADE: " . $resultado; 
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
