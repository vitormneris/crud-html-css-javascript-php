<?php

namespace App\Controller;

use App\Model\Model;
use App\Entity\Produto;

class ProdutoController
{
    private $_db;

    public function __construct()
    {
        $this->_db = new Model();
    }

    public function findAll(): array
    {
        $produto = $this->_db->select(table: 'produtos');
        return  $produto;
    }

    public function findById($id): array
    {
        $produto = $this->_db->select(table: 'produtos', conditions: ['id' => $id]);
        return  $produto;
    }

    public function insert($data): bool
    {
        $produto = new Produto();
        $produto->id = $data['id'];
        $produto->name = $data['nome'];
        $produto->price = $data['preco'];
        $produto->quantity = $data['quantidade'];

        if ($this->_db->insert(table: 'produtos', data: $produto->toArray())) {
            return true;
        }
        return false;
    }

    public function update($newData, $id): bool
    {

        $produto = new Produto();
        $produto->id = $newData['id'];
        $produto->name = $newData['nome'];
        $produto->price = $newData['preco'];
        $produto->quantity = $newData['quantidade'];

        $sucess = $this->_db->update(
            table: 'produtos',
            data: $produto->toArray(),
            conditions: ['id' => $id]
        );
        if ($sucess) {
            return true;
        }
        return false;
    }
    
    public function delete($id): bool
    {
        $sucess = $this->_db->delete(
            table: 'produtos', 
            conditions: ['id' => $id]
        );
        if ($sucess) {
            return true;
        }
        return false;
    }
}
