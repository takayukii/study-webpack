webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(1);
	var Alert = __webpack_require__(4); // ここを追加
	__webpack_require__(5); // ここを追加

	var Todo = function(title, done, order,callback) {
	    var self = this;
	    self.title = ko.observable(title);
	    self.done = ko.observable(done);
	    self.order = order;
	    self.updateCallback = ko.computed(function(){
	        callback(self);
	        return true;
	    });        
	}

	var viewModel = function(){
	    var self = this;
	    self.todos =  ko.observableArray([]);
	    self.inputTitle = ko.observable("");
	    self.doneTodos = ko.observable(0);
	    self.markAll = ko.observable(false);

	    self.addOne = function() {
	       var order = self.todos().length;
	       var t = new Todo(self.inputTitle(),false,order,self.countUpdate);
	       self.todos.push(t);

	       var alert = new Alert(self.inputTitle()); // 追加
	       alert.say(); // 追加

	    };
	    
	    self.createOnEnter = function(item,event){
	        if (event.keyCode == 13 && self.inputTitle()){
	            self.addOne();
	            self.inputTitle("");
	        }else{
	            return true;
	        };           
	    }
	    
	    self.toggleEditMode = function(item,event){
	        $(event.target).closest('li').toggleClass('editing');
	    }
	    
	    self.editOnEnter = function(item,event){
	        if (event.keyCode == 13 && item.title){
	            item.updateCallback();
	            self.toggleEditMode(item,event);
	        }else{
	            return true;
	        };           
	    }

	    self.markAll.subscribe(function(newValue){
	        ko.utils.arrayForEach(self.todos(), function(item) {
	            return item.done(newValue);
	        });        
	    });

	    self.countUpdate = function(item){
	        var doneArray = ko.utils.arrayFilter(self.todos(), function(it) {
	            return it.done();
	        });
	        self.doneTodos(doneArray.length);
	        return true;
	    };
	    
	    self.countDoneText = function(bool){
	        var cntAll = self.todos().length;
	        var cnt  = (bool ? self.doneTodos() : cntAll - self.doneTodos());
	        var text = "<span class='count'>" + cnt.toString() + "</span>";
	        text += (bool ? " completed" : " remaining");
	        text += (self.doneTodos() > 1 ? " items" : " item");
	        return text;
	    }
	    
	    self.clear = function(){
	        self.todos.remove(function(item){ return item.done(); });
	    }
	 };

	ko.applyBindings(new viewModel()); 



/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	var Alert = function(text) {
	    this.text = text;
	};
	Alert.prototype.say = function(){
	    console.log(this.text);
	    alert('alert: ' + this.text);
	};
	module.exports = Alert;



/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);