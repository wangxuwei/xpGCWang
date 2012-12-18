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
			
			
			$.when(dfd,app.actions.listGroups()).done(function(contact,groupsObj) {
				var groupList = groupsObj.result;
				if(contact.groupIds){
					for(var i = 0; i < groupList.length; i++){
						for(var j = 0; j < contact.groupIds.length; j++){
							if(groupList[i].fullId == contact.groupIds[j]){
								groupList[i].selected = true;
								break;
							}
						}
					}
				}
				contact.groupList = groupList;
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
		var groupIds = "";
		$e.find("input[name='groupId']:checked").each(function(i,obj){
			if(i != 0){
				groupIds += ",";
			}
			groupIds += $(this).val();
		console.log(i);
		console.log($(this).val());
		});
		console.log(groupIds);
		// if contact id exist do update,else do create
		app.actions.saveContact(view.contactId, name,email,groupIds).done(function() {
			$(document).trigger("DO_REFRESH_CONTACT");
			view.close();
		}); 


	}

	// --------- /View Private Methods --------- //

})();
