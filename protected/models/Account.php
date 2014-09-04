<?php

    /**
     * Acccount class.
     * Account class is the data structure to keeping information of users' accounts.
     * @author Victor Li lncwwn@gmail.com
     * @date 2014/09/04
     */

    class Account extends CActiveRecord {

        public $id;
        public $user_id;
        public $account;
        public $password;
        public $created;
        public $updated;

        public static function model($className = __CLASS__) {
            return parent::model($className);
        }

        public function tableName() {
            return 'tb_users';
        }

    }

?>
