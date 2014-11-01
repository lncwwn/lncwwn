<?php
    $cs = Yii::app()->clientScript;
    $cs->registerCssFile(Yii::app()->baseUrl.'/css/login.css');
?>
<div id="login">
    <form class="form login-form">
        <input type="text" class="input" name="nick" placeholder="昵称" autofocus="autofocus"/><br>
        <input type="password" class="input" name="passwd" placeholder="密码"/><br>
        <input type="checkbox" class="checkbox"/><span class="after-checkbox">一周内自动登录</span><br>
        <button class="btn rev-btn js-login-btn">登录</button>
        <button class="btn gray-btn js-forget-pass">忘记密码？</button>
    </form>
</div>
