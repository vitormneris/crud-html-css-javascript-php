<?php

namespace App\usuarios;

require "../vendor/autoload.php";

use App\Classes\Usuario;
use App\Controller\UserController;
use App\Controller\EnderecoController;

$users = new UserController();
$end = new EnderecoController();

$body = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : '';
switch ($_SERVER["REQUEST_METHOD"]) {
    case "POST";
        $resultado = $users->insert($body);
        echo json_encode(['status' => $resultado]);
        break;
    case "GET";
        if (!isset($_GET['id'])) {
            $resultado0 = $users->select();
            $resultado1 = $end->select();
            echo json_encode(["usuarios" => $resultado0, "enderecos" => $resultado1]);
        } else {
            $resultado0 = $users->selectId($id);
            $resultado1 = $end->selectId($id);
            echo json_encode(["status" => true, "usuario" => $resultado0[0], "endereco" => $resultado1[0]]);
        }

        break;
    case "PUT";
        $resultado0 = $users->update($body[0], intval($_GET['id']));
        $resultado1 = $end->update($body[1], intval($_GET['id']));
        echo json_encode(['status0' => $resultado0, 'status1' => $resultado1]);
        break;
    case "DELETE";
        $resultado0 = $users->delete(intval($_GET['id']));        
        $resultado1 = $end->delete(intval($_GET['id']));
        echo json_encode(['status0' => $resultado0, 'status1' => $resultado1]);
        break;
}
