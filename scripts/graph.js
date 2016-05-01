function node(svg) {

}

function edge(svg, source, target) {

}


var realGraph = graph();
realGraph.newNode("HEAD");

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(150)
    .size([400, 400])
    .nodes(realGraph.nodes)
    .links(realGraph.links)
    .start();

var svg = d3.select(".linkedList").append('svg')
		.attr("height", 500)
		.attr("width", 500);

  var link = svg.selectAll(".link")
  	.data(realGraph.links)
    .enter().append("line")
      .attr("class", "link")

  if (realGraph.weighted)
    link.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.weight })

  var node = svg.selectAll(".node")
      .data(realGraph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
    .attr('r', 10);

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.index + "/" + d.idx; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  });

function addNode(element, source) {
  force.stop();
  

  if (element === "" && source === "") {
    realGraph.newNode("element");   
  } else if (source === "") {
    realGraph.newNode(element);
  } else {
    realGraph.newNode(element, source)
  }

  force.nodes(realGraph.nodes);
  force.links(realGraph.links);

  force.charge(-200)
    .linkDistance(150).start();

  if (realGraph.weighted) {
  svg.selectAll('.link')
    .data(realGraph.links)
     .enter().insert("g", ":first-child")
      .attr("class", "link")
    .append("line")

    console.log(d3.selectAll(".link"));
    console.log(d3.selectAll(".link")[0].pop());
  d3.select(d3.selectAll(".link")[0][0])
    .append("text")
      .attr("x", function(d) {
          if (d.target.x > d.source.x) { return (d.source.x + (d.target.x - d.source.x)/2); }
          else { return (d.target.x + (d.source.x - d.target.x)/2); }
      })
            .attr("y", function(d) {
          if (d.target.y > d.source.y) { return (d.source.y + (d.target.y - d.source.y)/2); }
          else { return (d.target.y + (d.source.y - d.target.y)/2); }
      })
      .attr("dy", ".35em")
       .attr("fill", "Maroon")
      .style("font", "normal 12px Arial")
      .text(function(d) { return d.weight });
  }

  svg.selectAll('.node')
    .data(realGraph.nodes, function(d) { return d.idx }) 
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
  d3.select(d3.selectAll(".node")[0].pop())
    .append("circle")
    .attr("r", 10);
  d3.select(d3.selectAll(".node")[0].pop())
    .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.index + "/" + d.idx;});
    

  force.on("tick", function() {
    d3.selectAll(".link").select("line").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll(".link").select("text")      
      .attr("x", function(d) {
          if (d.target.x > d.source.x) { return (d.source.x + (d.target.x - d.source.x)/2); }
          else { return (d.target.x + (d.source.x - d.target.x)/2); }
      })
      .attr("y", function(d) {
          if (d.target.y > d.source.y) { return (d.source.y + (d.target.y - d.source.y)/2); }
          else { return (d.target.y + (d.source.y - d.target.y)/2); }
      });   

    d3.selectAll('.node').attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
};

function newLink(source, target) {
  force.stop();

  if (target === "" || source === "") {
    return undefined;  
  } else {
    realGraph.addLink(source, target);
  }
  
  force.links(realGraph.links);

  force.start();

  svg.selectAll('.link')
    .data(realGraph.links) 
    .enter().insert("line", ":first-child")
      .attr("class", "link");  

  force.on("tick", function() {
    d3.selectAll(".link").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll('.node').attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
}

function remove(source) {
  force.stop();
  realGraph.remove(source);
  

  force.links(realGraph.links);
  force.nodes(realGraph.nodes);

  force.start();

  svg.selectAll('.link').data(realGraph.links).exit().remove();
  svg.selectAll('.node').data(realGraph.nodes, function(d) {return d.idx}).exit().remove();

  force.on("tick", function() {
    d3.selectAll(".link").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll('.node').attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
}

document.getElementById("itemBtn").addEventListener("click", function() {
  var source = document.getElementById("source");
  if (source.value == "") {
    addNode(document.getElementById("itemText").value);
  } else {
    addNode(document.getElementById("itemText").value, source.value);
  }
});

document.getElementById("linkBtn").addEventListener("click", function() {
  var source = document.getElementById("source1");
  var target = document.getElementById("target1");
  if (source.value != "" && target.value != "") {
    newLink(source.value, target.value);
  }
});

document.getElementById("removeBtn").addEventListener("click", function() {
  var removeVal = document.getElementById("remove");
  if (removeVal.value != "") {
    remove(removeVal.value);
  }
});


// HTML TEXT
var about = "Of all the data structures, graphs are my favorite. Disregarding the mathematical " +
 "rabbit holes that you can find yourself in when you're studying graphs, they can be used to represent " +
 "a wide range of data. Common things one could want to preform on graphs would be finding the shortest path " +
 "from one vertex to another, finding a way to traverse the graph by first visiting all prerequisites, and tons " +
 "of other stuff.</p><br><p> In short, graphs are awesome.";

var applications = "A graph can be used to store data, show connections between data, and " +
  "lots of other things."; 

var costs = "Costs of graphs, unlike data structures, do not rely on N elements, but instead " +
"on two sets of elments. V is the set of all Vectors in the graph, and E is the set of all Edges. " +
"It's important to know the difference between the two. The math works out such that |E| (Magnitude of Set E, " +
"a.k.a. the number of edges in the set E) can end up resulting in either costs of O(|V|) or O(|V|<sup>2</sup>).";

var algorithms = "Dijkstras, Topological Sort, Minimum Spanning Trees";



