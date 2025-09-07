<?php

namespace app\entity;

class Endereco
{
    private int $_id;
    private string $_cep;
    private string $_uf;
    private string $_cidade;
    private string $_bairro;
    private string $_rua;
    private int $_usuarioId;

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

    public function getCep(): string
    {
        return $this->_cep;
    }

    public function setCep($cep): void
    {
        $this->_cep = $cep;
    }

    public function getUf(): string
    {
        return $this->_uf;
    }

    public function setUf($uf): void
    {
        $this->_uf = $uf;
    }

    public function getCidade(): string
    {
        return $this->_cidade;
    }

    public function setCidade($cidade): void
    {
        $this->_cidade = $cidade;

    }

    public function getBairro(): string
    {
        return $this->_bairro;
    }


    public function setBairro($bairro): void
    {
        $this->_bairro = $bairro;
    }


    public function getRua(): string
    {
        return $this->_rua;
    }

    public function setRua($rua): void
    {
        $this->_rua = $rua;
    }

    public function getUsuarioId(): int
    {
        return $this->_usuarioId;
    }

    public function setUsuarioId($usuarioId): void
    {
        $this->_usuarioId = $usuarioId;
    }

    public function toArray(): array 
    {
        return [
            'cep' => $this->getCep(),
            'uf' => $this->getUf(),
            'cidade' => $this->getCidade(),
            'bairro' => $this->getBairro(),
            'rua' => $this->getRua(),
            'usuario_id' => $this->getusuarioId()
        ];
    }
}
