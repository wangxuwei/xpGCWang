var app = app || {};
(function($) {
	
	app.render = function(templateName,data){
		data = data || {};
		return $(Handlebars.compile($(templateName).html())(data));
	}
	
	app.invokeRemote = function(remoteMethod){
		var dfd = $.Deferred();
		// var paramsArray = [];
		// var action = "CustomControl." + remoteMethod;
		// paramsArray.push(action);
// 		
		// for(var i = 1; i < arguments.length; i++){
			// paramsArray.push(arguments[i]);
		// }
//         
		// var resultFunc = function(result, event){
            	// dfd.resolve(result);
        // };
		// paramsArray.push(resultFunc);
// 		
		// paramsArray.push({escape: true});
// 		
		// //do call server data
		// console.log(paramsArray);
		// Visualforce.remoting.Manager.invokeAction.apply(Visualforce.remoting.Manager,paramsArray);
        return dfd.promise();
	}
	
	// -------- Public Methods --------- //
	/**
	 * A method about use ajax to get json data
	 */
	app.getJsonData = function(url, params) {
		var dfd = $.Deferred();
		params = params || {};
		jQuery.ajax({
			  type : params.method ? params.method : "Post",
			  url : url,
			  async : true,
			  data : params,
			  dataType : "json"
		  }).success(function(data) {
			  dfd.resolve(data);
		  }).fail(function(jxhr, arg2) {
			try {
				if (jxhr.responseText) {
					console.log(" WARNING: json not well formatted, falling back to JS eval");
					var data = eval("(" + jxhr.responseText + ")");
					dfd.resolve(data);
				} else {
					throw " EXCEPTION: Cannot get content for " + url;
				}
			} catch (ex) {
				console.log(" ERROR: " + ex + " Fail parsing JSON for url: " + url + "\nContent received:\n"
				  + jxhr.responseText);
			}
		});

		return dfd.promise();
	}
	
	/**
	 * Do a ajax post for the action and resolve with the JSON object (which is the WebActionHandler action name) and the data.
	 * 
	 * @param data {FormData} today, assume FormData
	 * 
	 * @return a Deferred 
	 */
	app.post = function(action,formData){
		var dfd = $.Deferred();
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', action, true);
		
		xhr.onload = function(e) {
			var jsonResult = JSON.parse(xhr.response);
			dfd.resolve(jsonResult);
		};
		
		xhr.onerror = function(e) {
			dfd.fail("app.post failed: " + e);
		}
		
		xhr.send(formData);  // multipart/form-data
		
		return dfd.promise();
	}
})(jQuery);
