<?php
    $cs = Yii::app()->clientScript;
    $cs->registerCssFile(Yii::app()->baseUrl.'/css/register.css');
?>
<div id="register">
    <form class="form reg-form">
        <input type="text" class="input" name="nick" placeholder="请输入昵称" autofocus="autofocus"/><br>
        <input type="password" class="input" name="passwd" placeholder="请输入密码"/><br>
        <input type="password" class="input" name="_passwd" placeholder="请确认密码"/><br>
        <input type="text" class="input" name="email" placeholder="请输入邮箱，用于密码找回"/><br>
        <input type="text" class="input" name="phone" placeholder="请输入手机号，用于密码找回"/><br>
        <input type="checkbox" class="checkbox"/><a href="" title="点击查看服务条款" class="after-checkbox">我已接受服务条款</a><br>
        <button class="btn rev-btn">注册</button>
        <button class="btn gray-btn">已有帐号？</button>
    </form>
</div>
