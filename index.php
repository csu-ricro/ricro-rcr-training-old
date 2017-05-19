<?php
	require_once "../_support/globalVariables.php";
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta name="description" content="Colorado State University Responsible Conduct of Research (RCR) Online Training">
		<meta name="author" content="Colorado State University Research Integrity and Compliance Review Office">
		<meta name="keywords" content="CSU,RCR,Responsible,Conduct,Research,Colorado,State,University,Online,Training,ColoState,RICRO">
		<meta name="theme-color" content="#ad841f" />
		<link rel="icon" href="support/images/favicon.png">

		<title>RCR Online Training</title>

		<!-- Bootstrap core CSS -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
		<!-- FontAwesome core CSS -->
		<script src="https://use.fontawesome.com/ac68863c46.js"></script>

		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<link href="support/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="support/css/main.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>

	<body>
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand module-btn" href="../"><?php echo $projectName;?></a>
				</div>
				<div id="navbar" class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Modules <span class="caret"></span></a>
							<ul class="dropdown-menu" id="top-module-nav"></ul>
						</li>
						<li><a href="<?php echo $ricroHome; ?>" title="Research Integrity and Compliance Review Office">RICRO</a></li>
						<li><a href="<?php echo $ricroContactUs; ?>">Contact</a></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li><?php echo $ricroModulesDropdown?></li>
					</ul>
				</div><!--/.nav-collapse -->
			</div>
		</nav>
		
		<div class="container">
			<br>
			<div id="alert-container"></div>
			<div id="page-body"></div>
			<img id="csu-logo" class="center-block" src="support/images/CSU_Logo.png" alt="Colorado State University"/>
			<br>
			<br>
		</div><!-- /.container -->
		
		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="support/assets/js/vendor/jquery.min.js"><\/script>')</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="support/assets/js/ie10-viewport-bug-workaround.js"></script>
		<script src="support/js/main.js"></script>
	</body>
</html>