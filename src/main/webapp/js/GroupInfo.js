;(function() {

	/**
	 * View: GroupInfo
	 *
	 */
	brite.registerView("GroupInfo", {
		loadTmpl : true,
		parent : "body"
	}, {
		
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			if (data.id) {
				app.actions.getGroup(data.id).done(function(data) {
					dfd.resolve(data.result);
				});
			} else {
				dfd.resolve({});
			}
			dfd.done(function(group) {
				console.log(group);
				view.groupId = group.id || null;
				var $html = app.render("#tmpl-GroupInfo",group);
				//show a screen to prevent use click other places
				view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("body");
				createDfd.resolve($html);
			});

			return createDfd.promise();
		},
		
		events : {
	 		"btap; .btnClose": function(){
	 			var view = this;
	 			view.close();
	 		}, 
	 		"btap; .btnCreate": function(){
	 			saveGroup.call(this);
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
	function saveGroup() {
		var view = this;
		var $e = view.$el;

		var name = $e.find("input[name='name']").val();

		// if group id exist do update,else do create
		app.actions.saveGroup(view.groupId, name).done(function() {
			$(document).trigger("DO_REFRESH_GROUP");
			view.close();
		}); 


	}

	// --------- /View Private Methods --------- //

})();
