<?php

	class UserController extends Controller {

		public function actionIndex() {
			$this->render('index');
		}

		public function actionRegister() {
			$this->render('register');
		}

        public function actionLogin() {
            $this->render('login');
        }
	}
