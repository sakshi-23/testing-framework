function init(){
	var editor=initalizeEditor();
	var whiteList=["VariableDeclaration","DoWhileStatement"];
	var blackList=["ReturnStatement","SwitchStatement"];
	var structure=["WhileStatement { ForStatement { FunctionDeclaration }","IfStatement { VariableDeclaration }"];
	var source = document.getElementById("result-template").innerHTML; 
	var template = Handlebars.compile(source); 
	var feedBackNode = document.getElementById('feedBack');
	var testResultsPrev="";
	registerHandleBarIfHelper();
	textChanged();
	createTestInputs();
	var typingTimer;
	var submitButton=$('#submit').on("click",inputChange);	
	
	function initalizeEditor(){
		var editor = ace.edit("editor");
		var editorSession=editor.getSession()
		editor.setOptions({
		    showPrintMargin: false
		});
		editor.setValue("while(ss){\n\tfor(;;){\n\t\tswitch(a){\n\t\t}\n\t\tif(a){\n\t\t}\n\t\tif(a){ \n\t\t\tvar i; \n\t\t}\n\t\tswitch(a){\n\t\t}\n\t}\n}")
		editorSession.setMode("ace/mode/javascript");
		editorSession.setUseWrapMode(true);
		setEditorEventListeners();
		return editor;
	}
	
	
	function inputChange(){
		var inputs, index;		
		whiteList=[];
		blackList=[];
		structure=[];
		inputs = $('.whiteList');
		for (index = 0; index < inputs.length; ++index) {
			whiteList.push(inputs[index].value);
		}
		inputs = $('.blackList');
		for (index = 0; index < inputs.length; ++index) {
			blackList.push(inputs[index].value);
		}
		inputs = $('.structure');
		for (index = 0; index < inputs.length; ++index) {
			structure.push(inputs[index].value);
		}
		textChanged();
	}
	
	
	

	
	function setEditorEventListeners(){
		var editor=$('#editor');
		editor.on("keyup",function(item){
			window.clearTimeout(typingTimer);
			  typingTimer = window.setTimeout(textChanged, 200);
			});		
			
		editor.on('keydown',function(item){
				window.clearTimeout(typingTimer);
				});
		}

	
	function textChanged(){
		  var testResults=validator.test(editor.getValue(),whiteList,blackList,structure);
		    if(testResults===false){
		    	document.getElementById('ajaxLoader').style.display = 'block';
		    }
		    else if(testResults!==testResultsPrev){
		    	 document.getElementById('ajaxLoader').style.display = 'none';
		    	 feedBackNode.innerHTML=template(testResults);    
		    	 testResultsPrev=testResults;
		    }  
		
	}
	
	
	
	
	function createTestInputs(){
		var source = document.getElementById("setting-template").innerHTML; 
		var template = Handlebars.compile(source); 
		var setTest = document.getElementById('setTest');
		var inputList={"whiteList":whiteList,"blackList":blackList,"structure":structure};		
		setTest.innerHTML=template(inputList);  		
	}
	
	function registerHandleBarIfHelper(){
		Handlebars.registerHelper('ifCond', function(v1, v2, options) {
			  if(v1 === v2) {
			    return options.fn(this);
			  }
			  return options.inverse(this);
			});				
	}
	
	

	
};

init();
