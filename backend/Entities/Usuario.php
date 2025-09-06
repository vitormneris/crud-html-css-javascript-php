<?php

namespace App\Entity;

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

    public function setId($id): self
    {
        $this->_id = $id;
        return $this;
    }

    public function getNome(): string
    {
        return $this->_nome;
    }

    public function setNome($nome): self
    {
        $this->_nome = $nome;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->_email;
    }

    public function setEmail($email): self
    {
        $this->_email = $email;
        return $this;
    }

    public function getSenha(): string
    {
        return $this->_senha;
    }

    public function setSenha($senha): self
    {
        $this->_senha = password_hash($senha, PASSWORD_DEFAULT);
        return $this;
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
