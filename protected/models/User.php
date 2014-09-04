<?php

	/**
	 * User class.
	 * User class is the data structure to keeping users' information.
     * @author Victor Li lncwwn@gmail.com
     * @date 2014/09/04
	 */
	class User extends CActiveRecord {

		public $id;
		public $nick;
		public $password;
		public $created;

		public static function model($className = __CLASS__) {
			return parent::model($className);
		}

		public function tableName() {
			return 'tb_users';
		}
	}
?>
