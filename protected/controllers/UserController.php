<?php
    /**
     * User controller
     * @author Victor Li lncwwn@gmail.com
     * @date 2014/09/09
     */
	class UserController extends Controller {

        /**
         * user register action
         * @param $nick user nick
         * @param $passwd user password
         * @param $email user email
         * @param $phone user phone, optional
         */
        public function actionRegister() {
            $user = new User('register');
            if (isset($_POST['User'])) {
                $model->attributes = $_POST['User'];
                if ($model->validate()) {
                    if ($user->register()) {
                        $this->redirect('login');
                    }
                }
            }
            $this->render('register');
		}

        public function actionLogin() {
            $this->render('login');
        }
	}
