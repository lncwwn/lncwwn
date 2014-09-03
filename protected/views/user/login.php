<?php
    $cs = Yii::app()->clientScript;
    $cs->registerCssFile(Yii::app()->baseUrl.'/css/login.css');
?>
<div id="login">
    <form class="form login-form">
        <input type="text" class="input" placeholder="昵称" autofocus="autofocus"/><br>
        <input type="password" class="input" placeholder="密码"/><br>
        <button class="btn rev-btn">登录</button>
        <button class="btn gray-btn">忘记密码？</button>
    </form>
</div>
