var app = app || {};
(function($) {
	app.oauth = {};
	
	app.oauth.authorize = function(service){
		window.open(contextPath+"/authorize.json?service="+service);
	}
	
	app.oauth.setToken = function(code,service){
		var params = {mehotd:"POST"};
		params.params = "code="+code;
		params.service = service;
		return app.getJsonData(contextPath+"/setToken.do",params);
	}
})(jQuery);
