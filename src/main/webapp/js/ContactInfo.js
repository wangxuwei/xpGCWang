;(function() {

	/**
	 * View: ContactInfo
	 *
	 */
	brite.registerView("ContactInfo", {
		loadTmpl : true,
		parent : "body"
	}, {
		
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			if (data.id) {
				app.actions.getContact(data.id).done(function(data) {
					dfd.resolve(data.result);
				});
			} else {
				dfd.resolve({});
			}
			dfd.done(function(contact) {
				console.log(contact);
				view.contactId = contact.id || null;
				var $html = app.render("#tmpl-ContactInfo",contact);
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
	 			saveContact.call(this);
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
	function saveContact() {
		var view = this;
		var $e = view.$el;

		var name = $e.find("input[name='name']").val();
		var email = $e.find("input[name='email']").val();

		// if contact id exist do update,else do create
		app.actions.saveContact(view.contactId, name,email).done(function() {
			$(document).trigger("DO_REFRESH_CONTACT");
			view.close();
		}); 


	}

	// --------- /View Private Methods --------- //

})();
