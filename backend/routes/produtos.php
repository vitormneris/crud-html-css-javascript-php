<?php

namespace app\routes;

require "../../vendor/autoload.php";

use app\controller\ProdutoController;

$produtoController = new ProdutoController();

$body = json_decode(
    json: file_get_contents(filename: 'php://input'), 
    associative: true
);
$id = isset($_GET['id']) ? $_GET['id'] : '';

switch ($_SERVER["REQUEST_METHOD"]) {
case "GET":
    if ($id == "") {
        $resultado = $produtoController->findAll();
        echo json_encode(value: ["status" => true, "data" => $resultado]);
    } else {
        $resultado = $produtoController->findById(id: $id);
        echo json_encode(value: ["status" => true, "data" => $resultado]);
    }
    break;
case "POST":
    $resultado = $produtoController->insert(data: $body);
    echo json_encode(value: ['status' => $resultado]);
    break;
case "PUT":
    $resultado = $produtoController->update(newData: $body, id: intval(value: $id));
    echo json_encode(value: ['status' => $resultado]);
    break;
case "DELETE":
    $resultado = $produtoController->delete(id: intval(value: $id));
    echo json_encode(value: ['status' => $resultado]);
    break;
}