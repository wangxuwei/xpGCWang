;(function() {

	/**
	 * View: Token
	 *
	 */
	brite.registerView("Token", {
		loadTmpl : true,
		parent : "body"
	}, {
		
		create : function(data, config) {
			var view = this;
			data = data || {};
			view.service = data.service || "GG";
			
			var $html = app.render("#tmpl-Token");
				//show a screen to prevent use click other places
			view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("body");
			return $html;
		},
		
		events : {
	 		"btap; .btnAuth": function(){
	 			var view = this;
	 			var str = app.oauth.authorize(view.service);
	 			if(str == "DONE_TOKEN_SAVE"){
	 				window.location = contextPath + "/";
	 			}
	 		}
		},

		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},
	});

})();
