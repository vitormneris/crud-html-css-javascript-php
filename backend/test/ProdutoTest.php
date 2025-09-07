<?php

namespace app\tests;

use app\model\Model;

class ProdutoTest
{

    private $_db;

    public function __construct()
    {
        $this->_db = new Model();
    }

    public function runTests()
    {
        echo "CRUD tests...<br>";
        $this->select();
        $this->insert();
        $this->select();
        $this->update();
        $this->select();
        $this->delete();
        $this->select();
    }
    public function select()
    {
        echo "<b>SELEÇÃO:</b>";
        $produto = $this->_db->select('produtos');
        echo "Test do Select " . count($produto)  . " produtos.\n";
        foreach ($produto as $produtos) {
            foreach ($produtos as $key => $value) {
                echo '<br>'.$key.': '.$value;
            }
        }
        echo "<hr>";
    }
    public function insert()
    {
        echo "<b>INSERÇÃO:</b>";
        $data = ['nome' => 'Café', 'preco' => '1,50', 'quantidade' => '5'];
        $result = $this->_db->insert('produtos', $data);
        echo "Teste do Insert: " . ($result ? "Sucesso" : "Falha") . "\n";
        echo "<hr>";
    }
    public function update()
    {
        echo "<b>ATUALIZAÇÃO:</b>";
        $newData = ['nome' => 'Café', 'preco' => '3,50', 'quantidade' => '2'];
        $conditions = ['nome' => 'Café'];
        $result = $this->_db->update('produtos', $newData, $conditions);
        echo "Update : " . ($result ? "Sucesso" : "Falha") . "\n";
        echo "<hr>";
    }
    public function delete()
    {
        echo "<b>EXCLUSÃO:</b>";
        $conditions = ['nome' => 'Café'];
        $result = $this->_db->delete('produtos', $conditions);
        echo "Delete : " . ($result ? "Sucesso" : "Falha") . "\n";
        echo "<hr>";
    }
}
