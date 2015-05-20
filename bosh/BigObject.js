(function(window,undefined){

"use strict";


window.BigObject_D3Chart={version:"1.0.0"};

var derivedData;

window.$.fn.boshAssoc=function(jsonData){
         var bindDiv=this[0];
         var reformat=internalJSON2ASSOCLocal(jsonData);
         internalDrawChord(reformat.datagroups,reformat.matrix,bindDiv);
         return this;
};

window.$.fn.boshBasic=function(data,chartType,Height){
          var bindDiv=this[0];
          internalDrawChart(data,chartType,bindDiv,Height);
          return this;
};

window.BigObject_D3Chart.draw_RPCConn=function (conn,chartType,bindDiv,Height){
        var request_JSONRPC={};
        request_JSONRPC.method=conn.method;
        request_JSONRPC.params={};
        request_JSONRPC.params.stmt=conn.stmt;
        request_JSONRPC.id=1;
        $.post(conn.url,JSON.stringify(request_JSONRPC),"json")
        .done(function(data){ 
                derivedData=internalJSON2Local(data.result);
 		return new internalDrawChart(derivedData,chartType,bindDiv,Height);
 	});
 

};


window.BigObject_D3Chart.draw_RPCData=function (data,chartType,bindDiv,Height){
             var derivedData=internalJSON2Local(data.result);
             return new internalDrawChart(derivedData,chartType,bindDiv,Height);
};

window.BigObject_D3Chart.draw_JSONData=function (data,chartType,bindDiv,Height){
             return new internalDrawChart(data,chartType,bindDiv,Height);
};


window.BigObject_D3Chart.draw_LocalData=function (localdata,chartType,bindDiv,Height){
         return new internalDrawChart(localdata,chartType,bindDiv,Height);

};


window.BigObject_D3Chart.Association_LocalData=function(datagroups,matrix,bindDiv){
	return new internalDrawChord(datagroups,matrix,bindDiv);
};

window.BigObject_D3Chart.Association_JsonData=function(jsonData,bindDiv){
        var reformat=internalJSON2ASSOCLocal(jsonData);
        return new internalDrawChord(reformat.datagroups,reformat.matrix,bindDiv);
};

function internalJSON2Local(jsonData){
        return jQuery.parseJSON(jsonData);
};

function internalJSON2ASSOCLocal(jsonData){
        var tmpTable={};
        var matrix=[];
        var datagroups=[];

        for(var i in jsonData){
                var itemA=jsonData[i][0];
                var itemB=jsonData[i][1];
                var value=jsonData[i][2];
                if(!(itemA in tmpTable)){
			tmpTable[itemA]={};
                }
                if(!(itemB in tmpTable)){
                        tmpTable[itemB]={};
                }
                if(!(itemB in tmpTable[itemA]))tmpTable[itemA][itemB]=0;
                tmpTable[itemA][itemB]+=value;
                if(jQuery.inArray(itemA,datagroups)===-1)datagroups.push(itemA);
                if(jQuery.inArray(itemB,datagroups)===-1)datagroups.push(itemB);
	}
        //datagroups.sort();
        for(var indexA in datagroups){
             var row=[];
             for(var indexB in datagroups){
                      var itemA=datagroups[indexA];
                      var itemB=datagroups[indexB];
                     row.push(tmpTable[itemA][itemB]);
	     }
             matrix.push(row);
        }
       
        $.each(matrix,function(key1,value1){
                  $.each(matrix[key1],function(key2,value2){
                          //if(value2===undefined)matrix[key1][key2]=0;
                          if(value2===undefined)matrix[key1][key2]=matrix[key2][key1]===undefined?0:matrix[key2][key1];

                  });
        });
      
        
                 
        var reformat={
                datagroups:datagroups,
                matrix:matrix
        }; 
        return reformat;
};


function internalDrawChart(tableData,chartType,bindDiv,sizeHeight,sizeWidth,dataDimId,ctgyDimId ){
        sizeHeight=typeof sizeHeight === "undefined" ? 240:sizeHeight;
        sizeWidth=typeof sizeWidth === 'undefined'? 800:sizeWidth;
        dataDimId=typeof dataDimId === "undefined"? 0:dataDimId;
        ctgyDimId=typeof ctgyDimId==="undefined"?1:ctgyDimId;
        //default parameters not supported until ECMAScript 6
 
        var recordLength=tableData[0].length;



        var datasourceDim=dataDimId,
            categoryDim=ctgyDimId,
            quantityDim=recordLength-1;
        var datasourceIsMany=true;
        
        if(recordLength===2){
		categoryDim=0;
                datasourceIsMany=false; 
	}
        
        var Matrix={};
        var axisX=[];
        var sourceList=[];
        for(var i in tableData){
                var quantity=tableData[i][quantityDim];
                var category=tableData[i][categoryDim];
                var datasource=(datasourceIsMany)?tableData[i][datasourceDim]:"quantities";
                if(!(datasource in Matrix)){
			Matrix[datasource]={};
                }
                if(!(category in Matrix[datasource]))Matrix[datasource][category]=0;
                Matrix[datasource][category]+=quantity;
                if(jQuery.inArray(category,axisX)===-1)axisX.push(category);
                if(jQuery.inArray(datasource,sourceList)===-1)sourceList.push(datasource);
	}
        //sourceList.sort();
        //axisX.sort();

        var dataC3=[];
        for(var indexSource in sourceList){
             var row=[];
             for(var indexAxisX in axisX){
                      row.push(Matrix[sourceList[indexSource]][axisX[indexAxisX]]);
	     }
             row.splice(0,0,sourceList[indexSource]);
             dataC3.push(row);
        }
       
        $.each(dataC3,function(key1,value1){
                  $.each(dataC3[key1],function(key2,value2){
                          if(value2===undefined)dataC3[key1][key2]=0;
                  });
        });
        var dataChart=(chartType==="pie"&&recordLength===2)?tableData:dataC3;
	
        var chart = c3.generate({
    		bindto:bindDiv,
                padding:{
			top:40
		},
                size:{
			height:sizeHeight,
                        width:sizeWidth,
		},
            
   		data: {
      			columns:dataChart,
                        type:chartType
    		},
                
                axis:{
                       x:{
				type:"category",
		                categories:axisX
			}
                }

	});
};




function internalDrawChord(datagroups,matrix,bindDiv){
        bindDiv=typeof bindDiv === "undefined"? "body":bindDiv;
        var width = 1000,
        height = 1000,
        outerRadius = Math.min(width, height) / 2 - 200,
        innerRadius = outerRadius - 24;
        var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
                       "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
                       "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];
        
        var groupcolour = d3.scale.ordinal()
          .domain([0,datagroups.length/10,datagroups.length])
          .range(colours);
         
        var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
         
        var layout = d3.layout.chord()
        .padding(.01)
        .sortSubgroups(d3.descending)
        .sortChords(d3.ascending);
         
        var path = d3.svg.chord()
        .radius(innerRadius-5);
         
        var svg = d3.select(bindDiv).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id","assoc")
        .append("g")
        .attr("id", "circle")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
         
        svg.append("circle")
        .attr("r", outerRadius);
         
         
        // Compute the chord layout.
        layout.matrix(matrix);
         
        // Add a group per neighborhood.
        var group = svg.selectAll(".group")
        .data(layout.groups)
        .enter().append("g")
        .attr("class", "group")
        .on("mouseover", mouseover);
         
        // Add a mouseover title.
        // group.append("title").text(function(d, i) {
        // return datagroups[i].name + ": " + formatPercent(d.value) + " of origins";
        // });
         
        // Add the group arc.
        var groupPath = group.append("path")
        .attr("id", function(d, i) { return "group" + i; })
        .attr("d", arc)
        .style("fill", function(d, i) { return groupcolour(i); });
        
       //add a text label 
       var groupText=group.append("svg:text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", 5)
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + ( innerRadius) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function(d,i) { return datagroups[i]; });


 
        // Add a text label.
/*        var groupText = group.append("text")
        .attr("x", 6)
        .attr("dy", 15);
         
        groupText.append("textPath")
        .attr("xlink:href", function(d, i) { return "#group" + i; })
        .text(function(d, i) { return datagroups[i]; });
         
        // Remove the labels that don't fit. :(
        groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 16 < this.getComputedTextLength(); })
        .remove();
*/         
        // Add the chords.
        var chord = svg.selectAll(".chord")
        .data(layout.chords)
        .enter().append("path")
        .attr("class", "chord")
        .style("fill", function(d) {   
                                       return groupcolour(d.target.index);
                                   })
        .attr("d", path);
         
        // Add an elaborate mouseover title for each chord.
         chord.append("title").text(function(d) {
         	return datagroups[d.source.index]
         		+ " --->" + datagroups[d.target.index]
         		+ ": " + d.source.value
         		+ "\n" + datagroups[d.target.index]
         		+ " --->" + datagroups[d.source.index]
         		+ ": " + d.target.value;
         });

 group.append("title").text(function(d){
  return datagroups[d.index];
});


        function mouseover(d, i) {
        	chord.classed("chordfade", function(p) {
        	return p.source.index != i&& p.target.index != i;
        	});
        }
}; 




})(window);

(function(window,undefined){
	window.$.fn.boshBubble=function(data){
		
		var diameter = 960,
		    format = d3.format(",d"),
		    color = d3.scale.category20();
		
		var bubble = d3.layout.pack()
		    .sort(null)
		    .size([diameter, diameter])
		    .padding(1.5);
		
		var svg = d3.select(this[0]).append("svg")
		    .attr("width", diameter)
		    .attr("height", diameter)
		    .attr("class", "bubble");
		    
		var re = [];
		for(i in data)
			re.push({"text":data[i][0],"value":data[i][1]});
		//var root = {"children": re};
		
		console.log(re);
		
		var node = svg.selectAll(".node")
		    .data(bubble.nodes({"children": re}))
		    //.filter(function(d) { return !d.children; }))
		  .enter().append("g")
		    .attr("class", "node")
		    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		
		node.append("title")
		    .text(function(d) { return d.text + ": " + d.value; });
		
		node.append("circle")
                    .filter(function(d){ return d.parent; })
		    .attr("r", function(d) { return d.r; })
		    .style("fill", function(d,i) { return color(i); });
		
		node.append("text")
		    .attr("dy", ".3em")
		    .style("text-anchor", "middle")
                    .style({"font-size":"15px"})
		    .text(function(d) { return d.text; });
		
		d3.select(self.frameElement).style("height", diameter + "px");     
	         
		return this;
	};
	/*
	var c = d3.scale.linear()
		.range([0, 240])
		.domain([0, 1]);
    function rc(){ return Math.floor(c(Math.random())); }
    function color(i){
    	console.log('enter');
    	return 'rgb('+rc()+','+rc()+','+rc()+')';
    	//return 'rgb(120,155,200)';
    }*/

})(window);
