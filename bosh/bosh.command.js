(function(window,undefined){
var derivedData = [];
var localvarspace = {};
var dataCommand;
var isLoading = false;


angular.module('ng-terminal-bosh.command', ['ng-terminal-example.command.tools'])
.config(['commandBrokerProvider', function (commandBrokerProvider) {


    commandBrokerProvider.appendCommandHandler({
        command: 'clear',
        description: ['Clears the screen.'],
        handle: function (session) {
            session.commands.push({ command: 'clear' });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'csvloader',
        description: ['Upload files'],
        
        handle: function (session) {
                var tablename = Array.prototype.slice.call(arguments, 1).join(' ');
                csvloader(session,tablename);
        }
    });


    commandBrokerProvider.appendCommandHandler({
        command: 'bourl',
        description: ['Set bourl'],
        handle: function (session) {
            var first_arg =  Array.prototype.slice.call(arguments, 1).join(' ');
            if(first_arg!==undefined || first_arg!=""){
                    conn.scheme=url("protocol", first_arg) == 'bos' ? 'https' : 'http';
                    conn.host=url("hostname",first_arg);
                    conn.port=url("port",first_arg);
                    conn.token=url("pass",first_arg);
                    conn.path=url("path",first_arg);
                    conn.original = first_arg;
                    if (conn.port == 80 || conn.port == 443)
                    {   
                              conn.target = conn.scheme + '://' + conn.host + conn.path;
                    }else
                    {
                              conn.target = conn.scheme + '://' + conn.host + ':' + conn.port + conn.path;
                    }
                    window.bo.target = conn.target;
            }
            else
            {
                   session.output.push({ output: true, text: ["usage: bourl <BIGOBJECT_URL>"], breakLine: true });
 
            }
        }
    });

 

    commandBrokerProvider.appendCommandHandler({
        command: 'show',
        description: ['Show information in BigObject'],
        handle: function (session) {
            var cmdStr = "show " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['info'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'desc',
        description: ['Describe instance in BigObject'],
        handle: function (session) {
            var cmdStr = "desc " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['info'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'apply',
        description: ['Tree operation'],
        handle: function (session) {
            var cmdStr = "apply " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });



    commandBrokerProvider.appendCommandHandler({
        command: 'create',
        description: ['Create instance in BigObject'],
        handle: function (session) {
            var cmdStr = "create " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'set',
        description: ['set Date format in BigObject'],
        handle: function (session) {
            var cmdStr = "set " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });
    commandBrokerProvider.appendCommandHandler({
        command: 'use',
        description: ['assign workspace'],
        handle: function (session) {
            var cmdStr = "create " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
             conn.workspace =  Array.prototype.slice.call(arguments, 2)[0];
       }
    });


    commandBrokerProvider.appendCommandHandler({
        command: 'update',
        description: ['Update instance in BigObject'],
        handle: function (session) {
            var cmdStr = "update " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });

     commandBrokerProvider.appendCommandHandler({
        command: 'trim',
        description: ['Trim table'],
        handle: function (session) {
            var cmdStr = "trim " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'copy',
        description: ['Copy instance to BigObject'],
        handle: function (session) {
            var cmdStr = "copy " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });

 
 
    commandBrokerProvider.appendCommandHandler({
        command: 'drop',
        description: ['Drop instance in BigObject'],
        handle: function (session) {
            var cmdStr = "drop " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });


    commandBrokerProvider.appendCommandHandler({
        command: 'build',
        description: ['Build instance in BigObject'],
        handle: function (session) {
            var cmdStr = "build " + Array.prototype.slice.call(arguments, 1).join(' ');
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });


    commandBrokerProvider.appendCommandHandler({
        command: 'insert',
        description: ['Insert records into tables'],
        handle: function (session) {
            var cmdStr = "insert " + Array.prototype.slice.call(arguments, 1).join(' ');
            var info;
            try{
                   cmdDict['execute'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return 
            }
       }
    });

    commandBrokerProvider.appendCommandHandler({

        command: 'print',
        description: ['print local variable'],
        handle: function (session) {
            var varName =  Array.prototype.slice.call(arguments, 1).join(' ');
            dataCommand = 'print '+ varName;
            var newvar = session.localvar;
            session.localvar = undefined;
            
            if( ! ( varName.slice(1)  in localvarspace ) ) {
                    session.output.push({ output: true, text: [varName + " is not a local var, maybe you forget $ before var?"], breakLine: true });
                    return;
            }
            derivedData = localvarspace[varName.slice(1)];
            if( newvar ) localvarspace[newvar] = derivedData.slice(0);
            displayData(derivedData,"#output_panel");

        }
    });


    commandBrokerProvider.appendCommandHandler({

        command: 'column',
        description: ['print specific column of local variable', 'usage: column <NUM> <localvar>'],
        handle: function (session) {
            
            var varList =  Array.prototype.slice.call(arguments, 1);
            var colNum = varList[0];
            var varName = varList[1];
            dataCommand = "column " + varList.join(' ');
            var newvar = session.localvar;
            session.localvar = undefined;
            
            if( ! ( varName.slice(1)  in localvarspace ) ) {
                    session.output.push({ output: true, text: [varName + " is not a local var, maybe you forget $ before var?"], breakLine: true });
                    return;
            }

            derivedData = getColumn(colNum,localvarspace[varName.slice(1)]); 
            if( newvar ) localvarspace[newvar] = derivedData.slice(0);
            displayData(derivedData,"#output_panel");

        }
    });


    commandBrokerProvider.appendCommandHandler({

        command: 'select',
        description: ['select results in BigObject'],
        handle: function (session) {
            var cmdStr = "select " + Array.prototype.slice.call(arguments, 1).join(' ');
            dataCommand = cmdStr;
            try{
                   cmdDict['data'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return;
            }
        }
    });

    
    commandBrokerProvider.appendCommandHandler({

        command: 'find',
        description: ['find important information'],
        handle: function (session) {
            var cmdStr = "find " + Array.prototype.slice.call(arguments, 1).join(' ');
            dataCommand = cmdStr;
            try{
                   cmdDict['data'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return ;
            }
        }
    });

    commandBrokerProvider.appendCommandHandler({

        command: 'get',
        description: ['get association'],
        handle: function (session) {
            var cmdStr = "get " + Array.prototype.slice.call(arguments, 1).join(' ');
            dataCommand = cmdStr;
            try{   
                   cmdDict['data'](session,cmdStr);
            }catch(err){
                   session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                   return
            }
        }
    });
 






    // this must be the last
    var helpCommandHandler = function () {
        var me = {};
        
        me.command = 'help';
        me.description = ['Provides instructions about how to use this terminal'];
        me.handle = function (session, cmd) {
            var list = commandBrokerProvider.describe();
            var outText = [];
            if (cmd) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].command == cmd) {
                        var l = list[i];
                        outText.push("Command help for: " + cmd);
                        for (var j = 0; j < l.description.length; j++) {
                            outText.push(l.description[j]);
                        }
                        break;
                    }
                }
                if(!outText.length)
                    outText.push("There is no command help for: " + cmd);
            }
            else {
                outText.push("Available commands:");
                for (var i = 0; i < list.length; i++) {
                    var str = "  " + list[i].command + "\t\t";
                    for (var j = 0; j < 3 && i + 1 < list.length; j++) {
                        var cmd = list[++i].command;
                        str += cmd + (cmd.length > 6 ? "\t" : "\t\t");
                    }
                    outText.push(str);
                }
                outText.push("");
                outText.push("Enter 'help <command>' to get help for a particular command.");
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        };
        return me;
    };
    commandBrokerProvider.appendCommandHandler(helpCommandHandler());
}])
;



var print2Term = function(session,text){
            session.output.push({ output: true, text: text, breakLine: true });   //text must be an Array
            session.$scope.$apply();
 
}


var cmd2JSON = function(cmdStr){
        var cmdJson = {
                   "Stmt":cmdStr,
                   "Workspace":conn.workspace,
                   "Opts":conn.opts
        }
        return cmdJson;
}

var cleanDisplay=function(){
    $("#htable").remove();
    $("#output_panel").html("");
    $("#addchart").remove();
    $("#header").remove();
};

var cleanDraw=function(){
            $("#C3graph").html("");
            $("#D3chord").html("");
            $("#EpochChart").remove("");
};

var cleanDrawOptions=function(){
     $(".drawoption").remove();
};

var cleanCsvInput=function(){
     $(".disposible").remove();
};

var displayData = function(data,bindDiv){
	cleanDisplay();
        cleanCsvInput();
	$(bindDiv).append('<div id="htable" style="overflow:auto;height:240px"></div>');
	$("#htable").handsontable({
		data: data,
		minSpareRows: 0,
		colHeaders:true,
		rowHeaders:true,
		contextMenu: true,
		manualColumnMove:true,
                readOnly:true
	});
        cleanDraw();
        isDrawable();
};
/* previous API
var scanData = function(scankey,index,localvar){
                  var cmdJson = cmd2JSON('scan '+[scankey,index, 1000].join(' '));
                  $.post(conn.target+"/cmd",JSON.stringify(cmdJson),"json")
                        .done(function(data){
                               var data = data['Content'];
                               if(data.index!=-1){
                                   appendData(data.content);
                                   scanData(scankey,data.index,localvar);
                               }else{
                                   
                                   appendData(data.content);
                                   if(localvar)localvarspace[localvar]=derivedData.slice();
                                   displayData(derivedData,"#output_panel"); 
                                   isLoading=false;
                               }
                         });
}
*/

var scanData = function(scankey,index,localvar){

request.post({
        url: conn.target+"/cmd",
        json: true,
        body: {
            Stmt: 'SCAN ' + [scankey,index].join(' ')
        }
    })
    .pipe(JSONstream.parse())
    .pipe(es.mapSync(function(data) {
        appendData(data.Content.content);
        if(localvar)localvarspace[localvar]=derivedData.slice();
        displayData(derivedData,"#output_panel"); 
        isLoading=false;
    }));



}

var evalVar=function(cmdStr){
      var varlist=cmdStr.match(/\$(\w+)/g);
      return varlist;
};


var replace$Var=function(varStr,cmdStr){
        var replaceList=[];
        if (varStr in localvarspace){
                if(localvarspace[varStr][0]===undefined)return cmdStr;
                for(var j=0;j<localvarspace[varStr].length;j++){
                             var valueStr=localvarspace[varStr][j][0];
                             if((typeof valueStr)=="string")valueStr="'"+valueStr+"'";
                             replaceList.push(valueStr);
                }
        }else{  
                return cmdStr.replace("$"+varStr,varStr);
        }
        return cmdStr.replace("$"+varStr,replaceList.join(","));

};



var checkCmd = function (cmdStr){ 
    var varlist=evalVar(cmdStr);
       if(varlist!=undefined){
             for(var i=0;i<varlist.length;i++){
                    cmdStr=replace$Var(varlist[i].substring(1),cmdStr);
             }
       }
    return cmdStr;

}

var getColumn=function(index,array){
       var column=[];
       for(var i=0; i<array.length;i++){
               column.push([array[i][index]]);
       }

       return column;
}



var loadData = function (session,cmdStr ){
        cmdStr = checkCmd(cmdStr); 
       var cmdJson = cmd2JSON(cmdStr);
        if(isLoading){
              print2Term(session,["Already a loading data task, please wait "]);
              return; 
        }
        isLoading=true;
        $.post(conn.target + conn.cmdAPI,JSON.stringify(cmdJson),"json")
        .done(function(data){
                if(data['Err']==""){
                      var scankey = data['Content']['res'];
                      if (scankey.length!=undefined){
                              derivedData.length=0;
                              var localvar = session.localvar;
                              session.localvar = undefined;
                              scanData(scankey,1,localvar);
                      }else{
                              print2Term(session,['Empty Results']);
                              isLoading=false;
                      }
                }else{
                      print2Term(session,[data['Err']]);
                      isLoading = false;
                }
        })
        .fail(function(xhr, textStatus, errorThrown){
                 print2Term(session,["Connection error","check bourl: ",conn.target]);
                 isLoading=false;
       });
};

var displayInfo = function(session,cmdStr){
        var cmdJson = cmd2JSON(cmdStr); 
        $.post(conn.target+conn.cmdAPI,JSON.stringify(cmdJson),"json")
        .done(function(data){
             if(data['Err']==""){
                    var info = data['Content'];
                    var bindDiv = $('#output_panel'); 
                    cleanDisplay();
                    cleanCsvInput();
                    bindDiv.append('<div id="htable" style="overflow:auto;height:240px"></div>');
                    $("#htable").JSONView(info);
                    $("#htable").JSONView('toggle');
              }else{
                    print2Term(session,[data['Err']]);
              }
              cleanDraw();
              cleanDrawOptions();
        })
        .fail(function(xhr, textStatus, errorThrown){
                 print2Term(session,["Connection error","check bourl: ",conn.target]);
         });
     
};


var executeStatus=function(session,cmdStr){
        var cmdJson = cmd2JSON(cmdStr);
        $.post(conn.target + conn.cmdAPI,JSON.stringify(cmdJson),"json")
        .done(function(data){
                 var Msg = data['Err']=="" ? ["Success"] : [data['Err']];
                 print2Term(session,Msg);
        })
        .fail(function(xhr, textStatus, errorThrown){
                 print2Term(session,["Connection error","check bourl: ",conn.target]);
        });

};



var appendData = function(data){
       for (var i = 0; i < data.length; i++){
             derivedData.push(data[i]);
       }
};





var add2Report = function(){
        var container = $('<div class="row panel panel-default" ></div>');
        var chart = $('<div class ="col-md-6"  ></div>');
        var table = $('<div class ="col-md-6" style="padding-top:20px;"></div>');
        var header = $('<div class="col-md-11"><h3><span class="label label-info"></span></h3></div>');
        if($("#header").val().length===0){
                header.children().children().html($("#header").attr("placeholder"));
        }else{
                header.children().children().html($("#header").val());
        }
        $("#Report").append(container);
        var delBtn=$('<div class="col-md-1" style="padding-top:20px"><input type="button" class= "btn btn-danger" value="x"></div>');
        delBtn.on("click",function(){
                        container.remove();
                        });
        container.append(header);
        container.append(delBtn);
        container.append(table);
        container.append(chart);
        addTable2Report(table);
        bindChart(chart);
        $("#addchart").remove();
        $("#header").remove();
};


var bindChart = function(container){
        var type=$("#chartType").val();
        if(type==="assoc"){
                container.boshAssoc(derivedData);
        }else if(type==="bubble"){
                container.boshBubble(derivedData);
        }else if(type==="cloud"){
                var option = {'height':500,'width':1000,'focusperiod':200, 'style':'random', 'fontlist':['Lato'], 'max_rotate':0, 'mapping':'linear', 'len_adjust':false, 'max_font_size':100, 'min_font_size':20};
                container.boshWordcloud(derivedData,option);
        }else if(type==="corr"){
                var testSetting = {
                     quantity: 60,
                     correlation: 0.3,
                     size: 600,
                     draggable: true,
                     gravity: 0.1,
                     charge: -120
                };
                container.correlationTree(derivedData, testSetting);

        }else{
                container.boshBasic(derivedData,$("#chartType").val(),480);
        }
};


var addTable2Report = function(container){
	$(container).handsontable({
                 data: derivedData,
                 minSpareRows: 0,
                 rowHeaders:true,
                 contextMenu: true,
                 manualColumnMove:true,
                 readOnly:true

        });
};

var csvloader=function(session,tablename){
      var showData=function(csv){
             var lines=[];
             var tmp  = Papa.parse(csv).data;
             for (var i = 0 ;i < tmp.length;i++) {
                   if(tmp[i]=="")continue;
                   var tmpline=[];
                   for (var j = 0; j< tmp[i].length;j++){
                         tmpline.push(checktoken(tmp[i][j]));
                   }
                   lines.push(tmpline);
             }
             derivedData=lines;
             displayData(derivedData,"#output_panel");
             cleanDraw();
             isDrawable();
     };
     
     var checktoken=function(token){
              token=token.replace(/^["']|["']$/g,"");
              token=token.replace(/[']/g,"");
              token=token.replace(/[\\]/g,"");
              token=token.replace(/\r?\n|\r/g,"");
              return token
     }

     var insertData=function(){
          if(derivedData!=undefined&&derivedData.length!=0){
             var insertPrefix="INSERT INTO "+tablename +" VALUES ";
             var insertRecords="";
             var insertBuffer=10000;
             for (var i=0;i<derivedData.length;i++){
                      var row=derivedData[i];
                      var singleRecord="(";
                      for (var j=0;j<row.length;j++){
                            singleRecord+="'"+row[j]+"'";
                            if(j!=row.length-1)singleRecord+=", ";
                      }
                      singleRecord+=")";
                      insertRecords+=singleRecord+",";
                      if((i+1)%insertBuffer==0){
                            insertRecords=insertRecords.substring(0,insertRecords.length-1);
                            try{
                                cmdDict['execute'](session,insertPrefix + insertRecords);
                            }catch(err){
                                session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                                return;
                            }
                            insertRecords="";  
                      }
                        
             }
             if(insertRecords!=""){
                            insertRecords=insertRecords.substring(0,insertRecords.length-1);
                            try{
                                cmdDict['execute'](session,insertPrefix + insertRecords);
                            }catch(err){
                                session.output.push({ output: true, text: [err.why||err.message], breakLine: true });
                                return;
                            }
                            insertRecords="";  

             } 
             cleanCsvInput();
             cleanDisplay();
             derivedData.length=0;
             isDrawable();    
          }
     };

     var csvloadHandler=function(event){
             var csv=event.target.result;
             showData(csv);
             if($("#confirmcsv").length===0){
                         $("#table_layout").append($('<input type="button" id="confirmcsv" class="disposible btn btn-danger" value="Insert Data">'));
             }
             $("#confirmcsv").on("click",function(){
                      insertData();
             });



     }; 

     var errHandler=function(event){
             if(event.target.error.name=="NotReadableError"){
                      session.output.push({ output: true, text: ["Read csv file error"], breakLine: true });
             }

     };
    
     var importCSV=function(csvfile){
              var csvreader=new FileReader();
              csvreader.readAsText(csvfile);
              csvreader.onload = csvloadHandler;
              csvreader.onerror= errHandler;
     };


     var handlecsv=function(event){
               cleanDisplay();         
               $(".drawoption").remove();
               $("#confirmcsv").remove();
               if (window.FileReader){
                      var filelist=event.target.files;
                      importCSV(filelist[0]);
               }else{
                      session.output.push({ output: true, text: ["Your browser does not support FILEreader API"], breakLine: true });
               }
     };

     if(tablename!==undefined){
           cleanCsvInput();
           cleanDraw();
           derivedData.length=0;
           cleanDisplay();
           isDrawable();
  

           if($("#csvfiles").length===0){
                  var bt=$('<input type="text" class="disposible form-control btn btn-default" id="btinfo" placeholder="Text input" readonly>');
                  $("#table_layout").append(bt);
                  $("#table_layout").append($('<input type="file" class="disposible btn btn-info" id="csvfiles" accept=".csv">'));
           }
           var csvfile=$("#csvfiles");
           $("#btinfo").attr("value","Data will be inserted into the table: "+tablename);
           csvfile.on("change",handlecsv);
     }else{
             session.output.push({ output: true, text: ["usage: csvloader <tablename>"], breakLine: true });
     }
 
};


var DrawChart = function(){
                      var type=$("#chartType").val();
                      cleanDraw();
                      if(type==="assoc"){
                             $("#D3chord").boshAssoc(derivedData);
                      }else if(type==="bubble"){
                             $("#D3chord").boshBubble(derivedData);
                      }else if(type==="cloud"){
                         var option = {'height':500,'width':1000,'focusperiod':200, 'style':'random', 'fontlist':['Lato'], 'max_rotate':0, 'mapping':'linear', 'len_adjust':false, 'max_font_size':100, 'min_font_size':20};
                         $("#D3chord").boshWordcloud(derivedData,option);
                      }else if(type==="corr"){
                               var testSetting = {
                                  quantity: 60,
                                  correlation: 0.3,
                                  size: 600,
                                  draggable: true,
                                  gravity: 0.1,
                                  charge: -120
                                  },
                                  test = $('#D3chord').correlationTree(derivedData, testSetting);
                      }else{ 
                             $("#C3graph").boshBasic(derivedData,$("#chartType").val(),480);
                      }

                      $('#main').scrollTop($('#main')[0].scrollHeight);
};


var isDrawable=function(){
     $(".drawoption").remove();
     if(derivedData!==undefined&&derivedData.length!=0){
        if(derivedData[0].length!=0){
                 $("#table_layout").append($('<select id="chartType" class="drawoption btn btn-info" ></select>'));
                 $("#table_layout").append($('<input type="button" id="draw" class="drawoption btn btn-success" value="Draw!">'));
             var typedict={
                   "histogram":"bar",
                   "word clouds":"cloud",
                   "correlation graph":"corr",
                   "chord chart":"assoc",
                   "bubble chart":"bubble",
                   "line chart":"line",
                   "pie chart":"pie",
                   "spline chart":"spline"

             };
             var options=$.map(typedict,function(value,label){
                   return '<option value="'+value+'">'+label+'</option>';

             }).join('');
             $("#chartType").html(options);
             $("#draw").on("click",DrawChart);
      }   
     }else{
              cleanDraw();
    }
}

var cmdDict = {
      'info':displayInfo,
      'data':loadData,
      'execute':executeStatus ,
}

var conn={
      scheme:"",
      port:"",
      host:"",
      token:"",
      path:"",
      workspace:"",
      opts: {Handle: true},
      original:"",
      cmdAPI:"/cmd",
      target:"{{if .TLS}}https{{else}}http{{end}}://{{.Host}}"
}

window.bo={}
window.bo.target=conn.target

})(window);
