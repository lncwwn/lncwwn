<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/common.css" media="screen, projection" />
	<title></title>
</head>
<body>
	<div class="container" id="page">
		<div id="header">
			<div id="logo">
				<a href="" class="link"><?php echo CHtml::encode(Yii::app()->name); ?></a>
			</div>
		</div><!-- header -->
		<?php echo $content; ?>
		<div class="clear"></div>
	</div>
	<div id="footer">
		<p class="copyright">Copyright &copy; by 小熊工作室. All Rights Reserved.</p>
	</div><!-- footer -->
</body>
<script type="text/javascript">
    // defined global base url for js
    var BASE_URL = '<?php echo Yii::app()->baseUrl; ?>';
</script>
<script src="<?php echo Yii::app()->baseUrl.'/js/require.js' ?>" data-main="<?php echo Yii::app()->baseUrl.'/js/main' ?>"></script>
</html>
