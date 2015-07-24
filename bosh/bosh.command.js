(function(window,undefined){

"use strict";

window.bosh={"version":"poc"};

window.bosh.cmdParser=function(){
       return cmdParser();
};



var derivedData=[];

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
//      target:"http://127.0.0.1:9090"
      target:"{{if .TLS}}https{{else}}http{{end}}://{{.Host}}"
}

window.bosh.target=conn.target;

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

var cmd2JSON = function(cmdStr){
        var cmdJson = {
                   "Stmt":cmdStr,
                   "Workspace":conn.workspace,
                   "Opts":conn.opts
        }
        return cmdJson;
}

var appendData = function(data){
       for (var i = 0; i < data.length; i++){
             derivedData.push(data[i]);
       }
};

var displayData = function(data,colheader,bindDiv){
	cleanDisplay();
        cleanCsvInput();
        var tablecontainer=$('<div id="htable" style="overflow:auto;"></div>');
        tablecontainer.height($(window).height() - $('#command').height()-100);
	$(bindDiv).append(tablecontainer);
	tablecontainer.handsontable({
		data: data,
		minSpareRows: 0,
		colHeaders:colheader,
		rowHeaders:true,
		contextMenu: true,
		manualColumnMove:true,
                readOnly:true
	});
        cleanDraw();
        isDrawable();
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

                      //$('#main').scrollTop($('#main')[0].scrollHeight);
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

var scanData = function(scankey,index,colheader){
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
        if (data.Content.index == -1) {
             $.unblockUI();
             displayData(derivedData,colheader,"#output_panel"); 
        }
    }));

}


var getHeader = function(scankey){
      var cmdJson = cmd2JSON("hdesc "+scankey);
      $.post(conn.target + conn.cmdAPI,JSON.stringify(cmdJson),"json")
       .done(function(data){
                var colheader = data['Content']['schema']['attr'].map(function(obj){return obj.name});
                $.blockUI({ message: '<h3>Loading data from the server</h3>' }); 

                scanData(scankey,1,colheader);
        })
        .fail(function(xhr, textStatus, errorThrown){
       });
 
}

var loadData = function (cmdStr ){
       var cmdJson = cmd2JSON(cmdStr);
        $.post(conn.target + conn.cmdAPI,JSON.stringify(cmdJson),"json")
        .done(function(data){
                if(data['Err']==""){
                      var scankey = data['Content']['res'];
                      if (scankey.length!=undefined){
                              derivedData.length=0;
                              getHeader(scankey);
                      }else{
                      }
                }else{
                      $("#output_panel").html(data['Err']);
                      derivedData.length=0;
                      isDrawable();
                }
        })
        .fail(function(xhr, textStatus, errorThrown){
       });
};

var displayInfo = function(cmdStr){
        var cmdJson = cmd2JSON(cmdStr); 
        $.post(conn.target+conn.cmdAPI,JSON.stringify(cmdJson),"json")
        .done(function(data){
              cleanDisplay();
              if(data['Err']==""){
                    var info = data['Content'];
                    var bindDiv = $('#output_panel'); 
                    bindDiv.append('<div id="htable" ></div>');
                    $("#htable").JSONView(info);
                    $("#htable").JSONView('toggle');
              }else{
                    $("#output_panel").html(data['Err']);                    
              }
              cleanDraw();
              cleanDrawOptions();
        })
        .fail(function(xhr, textStatus, errorThrown){
         });
     
};


var cmdParser=function(){
       var cmdArea=$('#command');
       var cmd=cmdArea.val();
       var type=cmd.split(" ").filter(function(item){return item!=""&&item!="\n"&&item!="\r\n"}).shift().toLowerCase();
       var cmdclass = {"select":"load","find":"load","get":"load"};
       if(type in cmdclass){
             loadData(cmd);         
       }else{
             displayInfo(cmd);             
       }
       cmdArea.val('');
}





})(window);
