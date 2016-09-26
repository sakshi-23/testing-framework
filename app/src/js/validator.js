var validator={
		__getCodeinRegex:__getCodeinRegex,
		test:test,
		testBlackList:testBlackList,
		testWhiteList:testWhiteList,
		testStructure:testStructure
		
};



function test(code,whiteList,blackList,structure){	
	var results={
		whiteList:"",
		blackList:"",
		structure:""		
	};
	
	try{
		this.parsedCode=esprima.parse(code);		
	}
	catch(err){		
		return false;
	}
	
	this.whiteList=whiteList;
	this.blackList=blackList;
	this.structure=structure;
	
	this.regexCode=this.__getCodeinRegex(this.parsedCode);
	results.whiteList=this.testWhiteList();
	results.blackList=this.testBlackList();
	results.structure=this.testStructure();
	return results;
	
}


function testWhiteList(){
	var result=[];
	
	for (var i=0;i<this.whiteList.length;i++){
			if(this.regexCode.indexOf(this.whiteList[i])===-1){
				result.push({"name": this.whiteList[i], "result":"fail"});		
				}	
			else{
				result.push({"name": this.whiteList[i], "result":"success"});	
			}
	}	
	return result;	
	
}

function testBlackList(){
	var result=[];
	
	for (var i=0;i<this.blackList.length;i++){
			if(this.regexCode.indexOf(this.blackList[i])!==-1){
				result.push({"name": this.blackList[i], "result":"fail"});				
				}	
			else{
				result.push({"name": this.blackList[i], "result":"success"});		
			}
	}	
	return result;		
}

function testStructure(){
	var result=[];
	
	for (var i=0;i<this.structure.length;i++){
		var structArray=this.structure[i].split(" ");	
		
		if(__testStructureMatch(this.regexCode,structArray)){
			result.push({"name": this.structure[i], "result":"success"});				
			}	
		else{
			result.push({"name": this.structure[i], "result":"fail"});		
		}
	}	
	return result;		
}

function __testStructureMatch(code, structArray){
	var codeArray=code.split(" ");
	var start=false;
	var tempArray=[];
	var structArrayLength=structArray.length;
	for (var i=0,j=0;i<codeArray.length;i++){
		if(codeArray[i]==structArray[j]){
			start=true;			
			if(structArray[j]!=='{' && structArray[j]!=='}'){
				tempArray.push(codeArray[i])
			}
			j++;			
		}
		if(start && codeArray[i]==='}'){
			if(tempArray.slice(-1)=="{"){
				tempArray.slice(-1,1);
			}
			if(tempArray.slice(-1)!='{'){
				tempArray.slice(-1,1);
				j=j-2;
			}	
			
		}
		if(start && codeArray[i]==='{'){
			tempArray.push(codeArray[i])
			
		}
	if(j==structArrayLength)
		return true;
	}
	return false;
}


function __getCodeinRegex(code){
	var regex=[]	
	if(code){
		if(code.body){
			var body=code.body;	
			if(code.body.body){
				body=code.body.body;	
			}
			for (var i=0;i<body.length;i++){
				{
					regex.push(body[i].type); //if it is an end node		
					regex.push("{");
					for (var key in body[i]) {
						  if (body[i].hasOwnProperty(key)) {
							  if(body[i][key] !== null && typeof body[i][key] === 'object')
								  regex.push(__getCodeinRegex(body[i][key]));
						  }
					}
					regex.push("}");
					
					
				}
	
			}
		}
		else{
			for (var key in code) {
				  if (code.hasOwnProperty(key)) {
					  if(code[key] !== null && typeof code[key] === 'object')
						  regex.push(__getCodeinRegex(code[key]));
				  }
			}
			
		}
		
	}
	return regex.join(" ");
}