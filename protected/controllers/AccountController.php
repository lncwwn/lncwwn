<?php
    class AccountController extends Controller {

        public function actionIndex() {
            $this->render('index');
        }

        public function actionList() {
            $this->render('list');
        }
    }
?>
