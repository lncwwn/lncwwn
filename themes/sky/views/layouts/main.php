<?php ?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/common.css" media="screen, projection" />
	<title></title>
</head>
<body>
	<div class="container" id="page">
		<div id="header">
			<div id="logo"><?php echo CHtml::encode(Yii::app()->name); ?></div>
		</div><!-- header -->
		<div id="content"><?php //echo $content; ?></div>
		<div class="clear"></div>
	</div>
	<div id="footer">
		<p class="copyright">Copyright &copy; by 小熊工作室. All Rights Reserved.</p>
	</div><!-- footer -->
</body>
</html>