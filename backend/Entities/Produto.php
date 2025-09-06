<?php

namespace App\Entity;

class Produto
{
    private int $_id;
    private string $_nome;
    private string $_preco;
    private string $_quantidade;

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

    public function getPreco(): string
    {
        return $this->_preco;
    }

    public function setPreco($preco): self
    {
        $this->_preco = $preco;
        return $this;
    }

    public function getQuantidade(): string
    {
        return $this->_quantidade;
    }

    public function setQuantidade($quantidade): self
    {
        $this->_quantidade = $quantidade;
        return $this;
    }

    public function toArray(): array 
    {
        return [
            'nome' => $this->getNome(),
            'preco' => $this->getPreco(),
            'quantidade' => $this->getQuantidade()
        ];
    }
}
