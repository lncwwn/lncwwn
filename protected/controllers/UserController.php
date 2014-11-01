<?php
    /**
     * User controller
     * @author Victor Li lncwwn@gmail.com
     * @date 2014/09/09
     */
	class UserController extends Controller {

        /**
         * user register action
         */
        public function actionRegister() {
            $user = new User('register');
            $nick = Yii::app()->request->getPost('nick');
            $password = Yii::app()->request->getPost('passwd');
            $email = Yii::app()->request->getPost('email');
            $register_succ = false;
            if (isset($nick) && isset($password) && isset($email)) {
                $user->nick = $nick;
                $user->password = $password;
                $user->email = $email;
                $user->created = date('Y-m-d H:i:s');
                if ($user->validate()) {
                    if ($user->register()) {
                        $register_succ = true;
                    }
                }
            }

            if ($register_succ) {
                $this->render('login');
            } else {
                $this->render('register');
            }
		}

        /**
         * login action
         * if nick or password is empty, stay on login page
         * else, redirect to index page
         */
        public function actionLogin() {
            $nick = Yii::app()->request->getPost('nick');
            $passwd = Yii::app()->request->getPost('passwd');
            $login_succ = false;
            if (isset($nick) && isset($passwd)) {
                $user = new User;
                $user->nick = $nick;
                $user->password = $passwd;
                if ($user->login()) {
                    $login_succ = true;
                }
            }

            if ($login_succ) {
                //$this->render();
            } else {
                $this->render('login');
            }
        }
	}
