<?php

namespace app\controller;

use app\model\Model;
use app\entity\Usuario;
use app\entity\Endereco;
use Throwable;

class UserController
{
    private $_db;

    public function __construct()
    {
        $this->_db = new Model();
    }

    public function findAll(): array
    {
        try {
            $usuariosComEndereco = [];
            $usuarios = $this->_db->select('usuarios');
            foreach ($usuarios as $usuario) {
                $endereco = $this->_db->select('enderecos', ['usuario_id' => $usuario["id"]]);
                foreach ($endereco as $value) {
                    $usuario["cep"] = $value["cep"];
                    $usuario["uf"] = $value["uf"];
                    $usuario["cidade"] = $value["cidade"];
                    $usuario["bairro"] = $value["bairro"];
                    $usuario["rua"] = $value["rua"];
                }
                $usuariosComEndereco[] = $usuario;
            }
            return  $usuariosComEndereco ?? [];
        } catch (Throwable) {
            return [];
        }
    }

    public function findById($id): array
    {
        try {
            $usuarioComEndereco = [];
            $usuario = $this->_db->select('usuarios', ['id' => $id]);
            $endereco = $this->_db->select('enderecos', ['usuario_id' => $id]);
            foreach ($usuario as $value) {
                $usuarioComEndereco["id"] = $value["id"];
                $usuarioComEndereco["nome"] = $value["nome"];
                $usuarioComEndereco["email"] = $value["email"];
                $usuarioComEndereco["senha"] = $value["senha"];
            }
            foreach ($endereco as $value) {
                $usuarioComEndereco["cep"] = $value["cep"];
                $usuarioComEndereco["uf"] = $value["uf"];
                $usuarioComEndereco["cidade"] = $value["cidade"];
                $usuarioComEndereco["bairro"] = $value["bairro"];
                $usuarioComEndereco["rua"] = $value["rua"];
            }
            return  $usuarioComEndereco ?? [];
        } catch (Throwable) {
            return [];
        }
    }

    public function insert($data): bool
    {
        try {
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
        } catch (Throwable) {
            return false;
        }
    }

    public function update($newData, $userId): bool
    {
        try {
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
        } catch (Throwable) {
            return false;
        }
    }

    public function delete($id): bool
    {
        try {
            if ($this->_db->delete('usuarios', ['id' => $id])) {
                return true;
            }
            return false;
        } catch (Throwable) {
            return false;
        }
    }
}
