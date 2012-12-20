<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>xpGCWang</title>
    
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap-responsive.css" />
    
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/css/import.less.css">
    [@webBundle path="/js/" type="js" /]
    
    [#-- Global Initialization --] 
    <script type="text/javascript">
      // set the contextPath as a javascript global variable
      var contextPath = "${_r.contextPath}";
      // set the default to load the template
      brite.defaultComponentConfig.loadTmpl = true;
    </script>
    [#-- /Global Initialization --] 
    	
  </head>

  <body>
   	<div >
   		login success
  	</div>
  
  <script type="text/javascript">
	$(function(){
		var url = window.location+"";
		params = url.substring(url.indexOf("?")+1, url.length);
		app.oauth.setToken(params,"GG").done(function(){
			window.returnValue = "DONE_TOKEN_SAVE";
			window.close();
		});
	});
	</script>
  </body>
</html>
