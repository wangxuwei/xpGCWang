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
	 			app.oauth.authorize(view.service);
	 		}, 
	 		"btap; .btnClose": function(){
	 			var view = this;
	 			view.close();
	 		}, 
	 		"btap; .btnSave": function(){
	 			saveToken.call(this);
	 		}
		},

		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},
	});

	// --------- View Private Methods --------- //
	function saveToken() {
		var view = this;
		var $e = view.$el;
		var code = $e.find("input[name='code']").val();
		app.oauth.setToken(code,view.service).done(function() {
			view.close();
			window.location = contextPath + "/";
		}); 


	}

	// --------- /View Private Methods --------- //

})();
