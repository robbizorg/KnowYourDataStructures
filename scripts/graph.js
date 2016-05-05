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

svg.append("g")
  .attr("id", "separation");

  var link = svg.selectAll(".link")
  	.data(realGraph.links)
    .enter().insert("line", "#separation")
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
      .text(function(d) { return d.element + "/" + d.idx; });

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
    // CURRENT ISSUE WITH APPENDING NODES
    // THE WEIGHT APPEARS TO SHIFT OVER ONE SPOT IN THE ARRAY
    // IT'S EITHER THAT, OR THAT THE GRAPH ITSELF IS ADDING THE 
    // LINKS INCORRECTLY, OR D3 ACTUALLY PUSHES THE LINK OBJECTS AROUND
  var newLink = svg.selectAll('.link')
    .data(realGraph.links)
     .enter().insert("g", "#separation")
      .attr("class", "link");
  newLink
    .append("line");

  newLink
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
      .text(function(d) { return d.element + "/" + d.idx;});
    

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

function newLink(source, target, weight) {
  force.stop();

  if (target === "" || source === "") {
    return undefined;  
  } else {
    realGraph.addLink(source, target, weight);
  }
  
  force.links(realGraph.links);

  force.start();

  if (realGraph.weighted) {
  var newLink = svg.selectAll('.link')
    .data(realGraph.links)
     .enter().insert("g", "#separation")
      .attr("class", "link");
  newLink
    .append("line");

  newLink
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
}
}

function remove(source) {
  force.stop();
  realGraph.remove(source);
  

  force.links(realGraph.links);
  force.nodes(realGraph.nodes);

  force.start();

  console.log(realGraph.links);
  svg.selectAll('.link').data(realGraph.links, function(d) {return d.source.idx}).exit().remove();
  svg.selectAll('.node').data(realGraph.nodes, function(d) {return d.idx}).exit().remove();

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
}

function getDijkstras(source, target) {
  var path = realGraph.getDijkstras(parseInt(source), parseInt(target));

  svg.selectAll('.link')
    .attr("class", function(d) {
      for (link in path) {
        if (path[link] == d) {
          return "link linkSelected";
        } 
      }
      return "link";
    });

  return path;
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
  var weight = document.getElementById("weight");
  if (source.value != "" && target.value != "") {
    newLink(source.value, target.value, weight.value);
  }
});

document.getElementById("removeBtn").addEventListener("click", function() {
  var removeVal = document.getElementById("remove");
  if (removeVal.value != "") {
    remove(removeVal.value);
  }
});

function constructTable(nodes) {
  var str = "";
  str += '<table style="width:100%"><tr><th>Nodes</th><th>Known</th><th>Distance</th><th>Path</th></tr>';
  for (node in nodes) {
    if (nodes[node].dist < 0)
      var dist = "Infinity";
    str += '<tr><td>' + nodes[node].idx + '</td><td>' + nodes[node].known + '</td><td>' + dist + '</td><td>' + nodes[node].path + '</td></tr>';
  }

  return str;
}
function doDijkstras(start, target) {
  if (!realGraph.weighted) {
    return false;
  }

  // Reset all the Nodes
  for (node in realGraph.nodes) {
    realGraph.nodes[node].dist = -1;
    realGraph.nodes[node].known = false;
    realGraph.nodes[node].path = null;
  }

  // html Strings to be returned
  htmlStrings = [];
  htmlStrings.push(constructTable(realGraph.nodes));
/*
  nodes[start].dist = 0;
  var q = [];
  q.push(nodes[start]);

  while (!realGraph.checkKnown()) {

  }
*/
  
  return htmlStrings;
}

// Example Table String '<table style="width:100%"><tr><th>First</th><th>Last</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td> <td>50</td></tr><tr><td>Eve</td><td>Jackson</td> <td>94</td></tr></table>' +
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

var algorithms = "<div class='algCon'><h3>Dijkstras</h3>" + 
"     <div class='row regDist' id='text3'>" +
        "<h4>Find Distance between Two Nodes</h4>" + 
        "<input id='distSource' type='text' placeholder='Source'>&nbsp" +
        "<input id='distTarget' type='text' placeholder='Target'>&nbsp" +
        "<button class='btn' id='distBtn'>Find Distance</button>" +
     "</div>" + 
"     <div class='row helpDist' id='text2'>" +
        "<h4>Find Distance between Two Nodes (with Steps and Table)</h4>" + 
        "<input id='distSource2' type='text' placeholder='Source'>&nbsp" +
        "<input id='distTarget2' type='text' placeholder='Target'>&nbsp" +
        "<button class='btn' id='distBtn2'>Find Distance</button>" +
     "</div>" + 
"<p>Where to even beigin with this amazing algorithm. Dijkstra's finds the shortest " +
"distance between two points in a, dare I say, greedy way. In the beginning, the algorithm " +
"first sets all nodes' known fields to false, their previous or path fields to null, and their distance fields " +
"to infinity (or in our case a negative number).</p><p>Then starting at a specified node, the algorithm sets the current " +
"node's known field to true, looks at all the adjacent nodes, and then sets their distance fields to the distance between " +
"the current node and themselves. After the distance, the algorithm then sets their path field to the current node. " +
"The next unknown node that is the shortest distance away is then the one that is selected next, and the process repeats itself " +
"until all nodes are known.</p>" + 

"<h3>Topological Sort</h3><h3>Minimum Spanning Trees</h3></div>";



