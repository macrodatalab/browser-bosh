﻿(function(window,undefined){


 var getschema = function(url,$scope){
                  $.get(url)
                  .done(function(data){
                            $scope.table = data;
                            $scope.schema = true;
                            $scope.$watch('table.name', function() {
                                   $scope.table.name = $scope.table.name.replace(/\s+/g,'');
                            });
 
                            $scope.$$phase || $scope.$apply();
                  });
 };

 var uploadHandler = function(posturl,$scope){
                 $("#uploader").pluploadQueue({
                      runtimes : 'html5,flash,silverlight,html4',
                      url:posturl,
                      required_features: "send_browser_cookies",
                      sortable: true,
                      dragdrop: true,
                      views: {
                              list: true,
                              active: 'list'
                      },
                      multipart_params:{
                              type: 'text/csv'
                      },
                      flash_swf_url : '../../js/Moxie.swf',
                      silverlight_xap_url : '../../js/Moxie.xap',
                    
                 });
                 var upload=$("#uploader").pluploadQueue();
                 upload.bind('Error',function(up,e){
                             alert(e.response);
                 });
                
                 upload.bind('FileUploaded',function(up,file,info){
             
                 });
                 
                 upload.bind('ChunkUploaded',function(up,file,info){
                              console.log('Loaded!');
                       
                 });
                     
                 upload.bind('UploadComplete',function(up,files){
                            $("#uploader").html("");
                            getschema(posturl,$scope) 
                 });
 }
var getBourl = function(){
      return window.bosh.target;
};
var attrtypes=['STRING','INT','INT32','FLOAT','VARSTRING','DATETIME32','DOUBLE'];
var schemaAPP = angular.module('schemaAPP', []);

schemaAPP.controller('schemaCtrl', function($scope){
           $scope.table={};
           var callback_url;
           $scope.attrtypes=attrtypes;
           $scope.schema=false;
           $scope.getUPURL= function(){
                      var target = getBourl();
                      $.post(target+"/import")
                      .done(function(data){
                               callback_url = JSON.parse(data).callback_url;
                               uploadHandler(target+callback_url,$scope);
                      });   
           };

           var checkstatus = function(url){
                      $.ajax({
                          url: url,
                          type: 'GET',
                          contentType: 'application/json',
                          success: function(result) {
                                  if(result=="done"){
                                       $.unblockUI();
                                       $scope.schema=false;
                                       $scope.$apply()
                                  }else{
                                          setTimeout(checkstatus(url),3000);
                                  }
                          }
                      }); 

           };

           $scope.putschema = function(option){
                      var target = getBourl();
                      $.ajax({
                          url: target+callback_url+"&action="+option,
                          type: 'PUT',
                          contentType: 'application/json',
                          data: JSON.stringify($scope.table),
                          success: function(result) {
                                  //$scope.schema=false;
                                  //$scope.$apply();
                                  $.blockUI({ message: '<h3>Processing data. Do not close the page</h3>' }); 
                                  newurl=callback_url.replace("import","import\/status");
                                  console.log(newurl);
                                  checkstatus(target+newurl);
                          }
                      }); 
           };

          

});
schemaAPP.controller('repeatCtrl',function($scope){
              $scope.$watch('column.attr', function() {
                     $scope.column.attr = $scope.column.attr.replace(/\s+/g,'');
              });

});
      


})(window);
