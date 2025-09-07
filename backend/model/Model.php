<?php 

namespace app\model;

use Exception;
use PDO;
use PDOException;

/*

Dependendo do tipo de banco de dados escolhido, você pode precisar ajustar os parâ-
metros de conexão ($_host, $_dbName, $_username e $_password) da seguinte forma:

MySQL:
$_host: Endereço do servidor MySQL (por exemplo, 'localhost' ou o IP do servidor)
$_dbName: Nome do banco de dados MySQL
$_username: Nome de usuário para acessar o banco de dados MySQL
$_password: Senha para acessar o banco de dados MySQL

PostgreSQL:
$_host: Endereço do servidor PostgreSQL (por exemplo, 'localhost' ou o IP do 
servidor)
$_dbName: Nome do banco de dados PostgreSQL
$_username: Nome de usuário para acessar o banco de dados PostgreSQL
$_password: Senha para acessar o banco de dados PostgreSQL

SQLite:
$_host: Não é necessário para SQLite, pois é um banco de dados baseado em arquivo
$_dbName: Caminho completo para o arquivo do banco de dados SQLite (por exemplo, 
'my_database.sqlite')
$_username: Não é necessário para SQLite
$_password: Não é necessário para SQLite

SQL Server (MSSQL):
$_host: Endereço do servidor SQL Server (por exemplo, 'localhost' ou o IP do 
servidor)
$_dbName: Nome do banco de dados SQL Server
$_username: Nome de usuário para acessar o banco de dados SQL Server
$_password: Senha para acessar o banco de dados SQL Server

*/
class Model
{
    private $_host = "";
    private $_dbName = "my_database.sqlite";
    private $_username = "";
    private $_password = "";
    private $_conn;
    private $_dbType = "sqlite"; // Opções: "mysql", "pgsql", "sqlite", "mssql"

    public function __construct()
    {
        $this->_connect();
    }

    private function _connect(): void
    {
        $this->_conn = null;

        try {
            switch ($this->_dbType) {
            case "mysql":
                $dsn = "mysql:host=" . $this->_host . ";dbname=" . $this->_dbName;
                break;
            case "pgsql":
                $dsn = "pgsql:host=" . $this->_host . ";dbname=" . $this->_dbName;
                break;
            case "sqlite":
                $filepath =  __DIR__ . "/../sqlite/". $this->_dbName;
                $dsn = "sqlite:" . $filepath;
                if (!file_exists(filename: $filepath)) {
                    die("Arquivo não encontrado: $filepath");
                }
                break;
            case "mssql":
                $dsn = "sqlsrv:Server=" 
                        . $this->_host 
                        . ";Database=" 
                        . $this->_dbName;
                break;
            default:
                throw new Exception("Database type not supported.");
            }
            if ($this->_dbType == "sqlite") {
                $this->_conn = new PDO(dsn: $dsn);
                $this->createTablesIfNotExists();
            } else {
                $this->_conn = new PDO(
                    dsn: $dsn, 
                    username: $this->_username, 
                    password: $this->_password
                );
            }
            $this->_conn->setAttribute(
                attribute: PDO::ATTR_ERRMODE, 
                value: PDO::ERRMODE_EXCEPTION
            );
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
    }

    public function getLastInsertId(): int
    {
        return $this->_conn->lastInsertId();
    }
    public function insert($table, $data): bool
    {
        $columns = implode(separator: ", ", array: array_keys(array: $data));
        $placeholders = implode(
            separator: ", ", 
            array: array_map(
                callback: function ($item): string {
                    return ":$item";
                }, 
                array: array_keys(array: $data)
            )
        );
        $query = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $this->_conn->prepare(query: $query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(param: ":$key", value: $value);
        }
        return $stmt->execute();
    }

    public function select($table, $conditions = []): array
    {
        $query = "SELECT * FROM $table";
        if (!empty($conditions)) {
            $conditionsStr = implode(
                separator: " AND ", 
                array: array_map(
                    callback: function ($item): string {
                        return "$item = :$item";
                    }, 
                    array: array_keys(array: $conditions)
                )
            );
            $query .= " WHERE $conditionsStr";
        }
        $stmt = $this->_conn->prepare(query: $query);
        foreach ($conditions as $key => $value) {
            $stmt->bindValue(param: ":$key", value: $value);
        }
        $stmt->execute();
        return $stmt->fetchAll(mode: PDO::FETCH_ASSOC);
    }

    public function update($table, $data, $conditions): bool
    {
        $dataStr = implode(
            separator: ", ", 
            array: array_map(
                callback: function ($item): string {
                    return "$item = :$item";
                },  
                array: array_keys(array: $data)
            )
        );
        $conditionsStr = implode(
            separator: " AND ", 
            array: array_map(
                callback: function ($item): string {
                    return "$item = :condition_$item";
                },
                array: array_keys(array: $conditions)
            )
        );
        $query = "UPDATE $table SET $dataStr WHERE $conditionsStr";
        $stmt = $this->_conn->prepare(query: $query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(param: ":$key", value: $value);
        }
        foreach ($conditions as $key => $value) {
            $stmt->bindValue(param: ":condition_$key", value: $value);
        }
        return $stmt->execute();
    }

    public function delete($table, $conditions): bool
    {
        $conditionsStr = implode(
            separator: " AND ", 
            array: array_map(
                callback: function ($item): string {
                    return "$item = :$item";
                }, 
                array: array_keys(array: $conditions)
            )
        );
        $query = "DELETE FROM $table WHERE $conditionsStr";
        $stmt = $this->_conn->prepare(query: $query);
        foreach ($conditions as $key => $value) {
            $stmt->bindValue(param: ":$key", value: $value);
        }
        return $stmt->execute();
    }

    public function createTablesIfNotExists(): void
    {
        $querys = [ 
            "CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL
            );",

            "CREATE TABLE IF NOT EXISTS enderecos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER NOT NULL,
                cep TEXT NOT NULL,
                uf TEXT NOT NULL,
                cidade TEXT NOT NULL,
                bairro TEXT NOT NULL,
                rua TEXT NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            );",

            "CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                quantidade INTEGER NOT NULL
            );"
        ];

        foreach ($querys as $query) {
            $stmt = $this->_conn->prepare($query);
            $stmt->execute();
        }
    }
}
