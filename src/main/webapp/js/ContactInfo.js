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
				view.contactFullId = contact.contactFullId || null;
				view.groupIds = contact.groupIds || [];
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
		var gIds = [];
		$e.find("input[name='groupId']:checked").each(function(i,obj){
			if(i != 0){
				groupIds += ",";
			}
			groupIds += $(this).val();
			gIds.push($(this).val());
		});
		var dIds = [];
		for(var i = 0; i < view.groupIds.length; i++){
			var deleteId = true;
			for(var j = 0; j < gIds.length; j++){
				if(gIds[j] == view.groupIds[i]){
					deleteId = false;
					break;
				}
			}
			if(deleteId){
				dIds.push(view.groupIds[i]);
			}
		}
		
		var dIdsStr = "";
		for(var i = 0; i < dIds.length; i++){
			if(i != 0){
				dIdsStr += ",";
			}
			dIdsStr += dIds[i];
		}
		
		// if contact id exist do update,else do create
		app.actions.saveContact(view.contactId,view.contactFullId, name,email,groupIds,dIdsStr).done(function() {
			$(document).trigger("DO_REFRESH_CONTACT");
			view.close();
		}); 


	}

	// --------- /View Private Methods --------- //

})();
