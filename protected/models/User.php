<?php

	/**
	 * User class.
	 * User class is the data structure to keeping users' information.
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