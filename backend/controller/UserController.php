<?php

namespace app\controller;

use app\model\Model;
use app\entity\Usuario;
use app\entity\Endereco;

class UserController
{
    private $_db;

    public function __construct()
    {
        $this->_db = new Model();
    }

    public function findAll(): array
    {
        $user = $this->_db->select('usuarios');
        return  $user;
    }

    public function findAllById($id): array
    {
        $user = $this->_db->select('usuarios', ['id' => $id]);
        return  $user;
    }

    public function insert($data): bool
    {
        $usuario = new Usuario();
        $usuario->setNome(nome: $data['nome']);
        $usuario->setEmail(email: $data['email']);
        $usuario->setSenha(senha: $data['senha']);

        if ($this->_db->insert('usuarios', $usuario->toArray())) {
            $userId = $this->_db->getLastInsertId();

            $endereco = new Endereco();
            $endereco->setCep(cep: $data['cep']);
            $endereco->setUf(uf: $data['uf']);
            $endereco->setCidade(cidade: $data['cidade']);
            $endereco->setBairro(bairro: $data['bairro']);
            $endereco->setRua(rua: $data['rua']);
            $endereco->setUsuarioId(usuarioId: $userId);
            
            if ($this->_db->insert('enderecos', $endereco->toArray())) {
                return true;
            }
        }
        return false;
    }

    public function update($newData, $userId): bool
    {
        $usuario = new Usuario();
        $usuario->setNome(nome: $newData['nome']);
        $usuario->setEmail(email: $newData['email']);
        $usuario->setSenha(senha: $newData['senha']);

        $usuarioAtualizado = $this->_db->update(
            'usuarios', 
            $usuario->toArray(), 
            ['id' => $userId]
        );

        if ($usuarioAtualizado) {
            $endereco = new Endereco();
            $endereco->setCep(cep: $newData['cep']);
            $endereco->setUf(uf: $newData['uf']);
            $endereco->setCidade(cidade: $newData['cidade']);
            $endereco->setBairro(bairro: $newData['bairro']);
            $endereco->setRua(rua: $newData['rua']);
            $endereco->setUsuarioId(usuarioId: $userId);

            $enderecoAtualizado = $this->_db->update(
                'enderecos', 
                $endereco->toArray(), 
                ['usuario_id' => $userId]
            );
            
            if ($enderecoAtualizado) {
                return true;
            }
        }
        return false;
    }

    public function delete($id): bool
    {
        if ($this->_db->delete('usuarios', ['id' => $id])) {
            return true;
        }
        return false;
    }
}
