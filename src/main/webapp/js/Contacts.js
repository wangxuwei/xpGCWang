;(function() {

	/**
	 * View: Contacts
	 *
	 */
    (function ($) {
        brite.registerView("Contacts",  {loadTmpl:true,emptyParent:true,parent:".MainScreen-main .contactsArea"}, {
            create:function (data, config) {
            	data = data || {};
            	this.groupId = data.groupId;
                var $html = app.render("#tmpl-Contacts",data);
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                
                refresh.call(view);
            },
            events:{
            	"click;.btnAdd":function(e){
            		brite.display("ContactInfo",null,{id:null});
            	},
            	"click;.btnEdit":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		brite.display("ContactInfo",null,{id:id});
            	},
            	"click;.btnDelete":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		app.actions.deleteContact(id).done(function(){
	            		refresh.call(view);
            		});
            	}
            },

            docEvents:{
            	"DO_REFRESH_CONTACT":function(){
            		refresh.call(this);
            	}
            },

            daoEvents:{
            }
        });
        
        function refresh(){
        	var view = this;
        	var $e = view.$el;
        	var $tbody = $e.find(".lists").empty();
        	app.actions.listContacts(view.groupId).done(function(data){
        		var list = data.result;
        		for(var i = 0; i < list.length; i++){
        			var obj = list[i];
        			obj.index = i+1;
        			obj.type="Contact";
        			console.log(list);
        			var $item = app.render("#tmpl-Contacts-rowItem",obj);
        			$tbody.append($item);
        		}
			});

        }
    })(jQuery);


})();
