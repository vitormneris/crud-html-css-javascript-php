<?php

namespace App\Controller;

use App\Classes\Model;

class EnderecoController
{

    private $db;
    private $endereco;

    public function __construct()
    {
        $this->db = new Model();
    }

    public function select()
    {
        $endereco = $this->db->select('endereco');
        return  $endereco;
    }

    public function selectId($id)
    {
        $endereco = $this->db->select('endereco', ['iduser' => $id]);
        return  $endereco;
    }

    public function insert($endereco)
    {   
        $this->endereco = $endereco;
        if ($this->db->insert(
            'endereco',
            [
                'cep' => $this->endereco->getCep(),
                'rua' => $this->endereco->getRua(),
                'bairro' => $this->endereco->getBairro(),
                'cidade' => $this->endereco->getCidade(),
                'uf' => $this->endereco->getUf(),
                'iduser' => $this->endereco->getIduser()
            ]
        )) {
            return true;
        }
        return false;
    }

    public function update($newData, $condition)
    {
        if ($this->db->update('endereco', $newData, ['iduser' => $condition])) {
            return true;
        }
        return false;
    }

    public function delete($conditions)
    {
        if ($this->db->delete('endereco', ['iduser' => $conditions])) {
            return true;
        }
        return false;
    }
}
