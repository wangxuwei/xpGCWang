;(function() {

	/**
	 * View: Groups
	 *
	 */
    (function ($) {
        brite.registerView("Groups",  {loadTmpl:true,emptyParent:true,parent:".MainScreen-main .groupsArea"}, {
            create:function (data, config) {
                var $html = app.render("#tmpl-Groups",data);
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
            		brite.display("GroupInfo",null,{id:null});
            	},
            	"click;.btnEdit":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		brite.display("GroupInfo",null,{id:id});
            	},
            	"click;.btnDelete":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		app.actions.deleteGroup(id).done(function(){
	            		refresh.call(view);
            		});
            	},
            	"click;.item":function(e){
            		var view = this;
            		var $el = view.$el;
            		var $btn = $(e.currentTarget);
            		var id = $btn.bEntity().id;
            		brite.display("Contacts",null,{groupId:id});
            	},
            },

            docEvents:{
            	"DO_REFRESH_GROUP":function(){
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
        	app.actions.listGroups().done(function(data){
        		var list = data.result;
        		for(var i = 0; i < list.length; i++){
        			var obj = list[i];
        			obj.index = i+1;
        			obj.type="Group";
        			console.log(list);
        			var $item = app.render("#tmpl-Groups-rowItem",obj);
        			$tbody.append($item);
        		}
			});

        }
    })(jQuery);


})();
