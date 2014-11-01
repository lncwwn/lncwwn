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
        public $email;
        public $phone;
		public $created;
        public $accepted = false;

		public static function model($className = __CLASS__) {
			return parent::model($className);
		}

		public function tableName() {
			return 'tb_users';
		}

        public function rules() {
            return array(
                array('nick, password', 'required'),
                array('email', 'email', 'on'=>'register'),
                array('accepted', 'boolean')
            );
        }

        /**
         * register behaviour
         */
        public function register() {
            $insert = 'insert into tb_users (nick, password, email, created)'
                .'values (:nick, :passwd, :email, :created)';
            $conn = Yii::app()->db;
            $command = $conn->createCommand($insert);
            $command->bindParam(':nick', $this->nick, PDO::PARAM_STR);
            $command->bindParam(':passwd', $this->password, PDO::PARAM_STR);
            $command->bindParam(':email', $this->email, PDO::PARAM_STR);
            $command->bindParam(':created', $this->created, PDO::PARAM_STR);
            $effect = $command->execute();
            if ($effect > 0) {
                return true;
            }
            return false;
        }

        /**
         * login behaviour
         */
        public function login() {
            $login = 'select nick, password from tb_users where nick = :nick';
            $conn = Yii::app()->db;
            $command = $conn->createCommand($login);
            $command->bindParam(':nick', $this->nick, PDO::PARAM_STR);
            $result = $command->query();
            $row = $result->readAll();
            foreach ($row as $matched_user) {
                if ($matched_user['password'] === $this->password) {
                    return true;
                }
            }
            return false;
        }

        public function attributeLabels() {
            return array(
                'verifyCode'=>'Verification Code',
            );
        }
	}
?>
