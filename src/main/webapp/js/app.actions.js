var app = app || {};
(function($) {
	app.actions = {};
	
	app.actions.listContacts = function(groupId){
		var params = {mehotd:"Get"};
		params.groupId = groupId;
		return app.getJsonData(contextPath+"/listContacts.json",params);
	}
	app.actions.getContact = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/getContact.json",params);
	}
	app.actions.saveContact = function(id,fullId,name,email,groupIds,deleteIds){
		var params = {mehotd:"Post"};
		params.id = id;
		params.fullId = fullId;
		params.name = name;
		params.email = email;
		params.groupIds = groupIds;
		params.deleteIds = deleteIds;
		return app.getJsonData(contextPath+"/saveContact.do",params);
	}
	app.actions.deleteContact = function(id){
		var params = {mehotd:"Post"};
		params.id = id;
		return app.getJsonData(contextPath+"/deleteContact.do",params);
	}
	
	app.actions.listGroups = function(){
		var params = {mehotd:"Get"};
		return app.getJsonData(contextPath+"/listGroups.json",params);
	}
	app.actions.getGroup = function(id){
		var params = {mehotd:"Get"};
		params.id = id;
		return app.getJsonData(contextPath+"/getGroup.json",params);
	}
	app.actions.saveGroup = function(id,name){
		var params = {mehotd:"Post"};
		params.id = id;
		params.name = name;
		return app.getJsonData(contextPath+"/saveGroup.do",params);
	}
	app.actions.deleteGroup = function(id){
		var params = {mehotd:"Post"};
		params.id = id;
		return app.getJsonData(contextPath+"/deleteGroup.do",params);
	}
})(jQuery);
