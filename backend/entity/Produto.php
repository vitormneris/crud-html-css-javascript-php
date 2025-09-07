<?php

namespace app\entity;

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

    public function getPreco(): string
    {
        return $this->_preco;
    }

    public function setPreco($preco): void
    {
        $this->_preco = $preco;
    }

    public function getQuantidade(): string
    {
        return $this->_quantidade;
    }

    public function setQuantidade($quantidade): void
    {
        $this->_quantidade = $quantidade;
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
