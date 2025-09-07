<?php

namespace app\routes;

require "../../vendor/autoload.php";

use app\controller\ProdutoController;

$produtoController = new ProdutoController();

$body = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : '';

switch ($_SERVER["REQUEST_METHOD"]) {
case "GET":
    if ($id == "") {
        $resultado = $produtoController->findAll();
        if ($resultado == []) {
            echo json_encode(["status" => false, "data" => $resultado]);
            break;
        }
        echo json_encode(["status" => true, "data" => $resultado]);
    } else {
        $resultado = $produtoController->findById($id);
        if ($resultado == []) {
            echo json_encode(["status" => false, "data" => $resultado]);
            break;
        }
        echo json_encode(["status" => true, "data" => $resultado[0]]);
    }
    break;
case "POST":
    $resultado = $produtoController->insert($body);
    echo json_encode(['status' => $resultado]);
    break;
case "PUT":
    $resultado = $produtoController->update($body, intval($id));
    echo json_encode(['status' => $resultado]);
    break;
case "DELETE":
    $resultado = $produtoController->delete(intval($id));
    echo json_encode(['status' => $resultado]);
    break;
}