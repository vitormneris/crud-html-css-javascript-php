<?php

namespace app\controller;

use app\model\Model;
use app\entity\Produto;
use Throwable;

class ProdutoController
{
    private $_db;

    public function __construct()
    {
        $this->_db = new Model();
    }

    public function findAll(): array
    {
        try {
            $produto = $this->_db->select(table: 'produtos');
            return  $produto ?? [];
        } catch (Throwable) {
            return [];
        }
    }

    public function findById($id): array
    {
        try {
            $produto = $this->_db->select(table: 'produtos', conditions: ['id' => $id]);
            return  $produto ?? [];
        } catch (Throwable) {
            return [];
        }
    }

    public function insert($data): bool
    {
        try {

            $produto = new Produto();
            $produto->setNome($data['nome']);
            $produto->setPreco($data['preco']);
            $produto->setQuantidade($data['quantidade']);

            if ($this->_db->insert(table: 'produtos', data: $produto->toArray())) {
                return true;
            }
            return false;
        } catch (Throwable) {
            return false;
        }
    }

    public function update($newData, $id): bool
    {
        try {
            $produto = new Produto();
            $produto->setNome($newData['nome']);
            $produto->setPreco($newData['preco']);
            $produto->setQuantidade($newData['quantidade']);

            $sucess = $this->_db->update(
                table: 'produtos',
                data: $produto->toArray(),
                conditions: ['id' => $id]
            );
            if ($sucess) {
                return true;
            }
            return false;
        } catch (Throwable) {
            return false;
        }
    }

    public function delete($id): bool
    {
        try {
            $sucess = $this->_db->delete(
                table: 'produtos',
                conditions: ['id' => $id]
            );
            if ($sucess) {
                return true;
            }
            return false;
        } catch (Throwable) {
            return false;
        }
    }
}
