<?php

namespace app\entity;

class Usuario
{
    private int $_id;
    private string $_nome;
    private string $_email;
    private string $_senha;

    public function __construct()
    {
        
    }

    public function getId(): int
    {
        return $this->_id;
    }

    public function setId($id): void
    {
        $this->_id = $id;
    }

    public function getNome(): string
    {
        return $this->_nome;
    }

    public function setNome($nome): void
    {
        $this->_nome = $nome;
    }

    public function getEmail(): string
    {
        return $this->_email;
    }

    public function setEmail($email): void
    {
        $this->_email = $email;
    }

    public function getSenha(): string
    {
        return $this->_senha;
    }

    public function setSenha($senha): void
    {
        #$this->_senha = password_hash($senha, PASSWORD_DEFAULT);
        $this->_senha = $senha;
    }

    public function toArray(): array 
    {
        return [
            'nome' => $this->getNome(),
            'email' => $this->getEmail(),
            'senha' => $this->getSenha()
        ];
    }
}
