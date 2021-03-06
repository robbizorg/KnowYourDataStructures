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

svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 26)
    .attr("refY", 0)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

svg.append("svg:defs").selectAll("marker")
    .data(["endSel"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 26)
    .attr("refY", 0)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("orient", "auto")
    .attr("fill", "#40ff00")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

  var link = svg.selectAll(".link")
  	.data(realGraph.links)
    .enter().insert("line", "#separation")
      .attr("class", "link")
      .attr("marker-end", "url(#end)");

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
      .attr("class", "link")
      .attr("marker-end", "url(#end)");

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
      .attr("class", "link")
      .attr("marker-end", "url(#end)");
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
  svg.selectAll('.link').data(realGraph.links).exit().remove();
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
    })
    .attr("marker-end", function(d) {
      for (link in path) {
        if (path[link] == d) {
          return "url(#endSel)";
        }
      }
      return "url(#end)";
    });

  return path;
}

function exampleGraph() {
  force.stop();
  console.log(realGraph.nodes);

  realGraph.reset();

  console.log(realGraph.nodes);

  svg.selectAll(".node").data(realGraph.nodes).exit().remove();
  svg.selectAll(".link").data(realGraph.links).exit().remove();

  addNode("New York");
  addNode("Las Vegas");
  addNode("Los Angeles");
  addNode("Vancouver");
  addNode("Tokyo");
  addNode("London");
  addNode("São Paulo");

  // New York Links
  newLink(0, 1, 300);
  newLink(0, 2, 500);
  newLink(0, 3, 700);
  newLink(0, 4, 2000);
  newLink(0, 5, 300);
  newLink(0, 6, 1200);

  // Las Vegas Links
  newLink(1, 2, 100);
  newLink(1, 3, 300);
  newLink(1, 4, 1000);
  newLink(1, 5, 1500);
  newLink(1, 6, 1000);

  // Los Angeles Links
  newLink(2, 3, 400);
  newLink(2, 4, 800);
  newLink(2, 5, 1800);
  newLink(2, 6, 1000);

  // Vancouver
  newLink(3, 4, 800);
  newLink(3, 5, 1800);
  newLink(3, 6, 2000);

  // Tokyo
  newLink(4, 5, 1000);
  newLink(5, 6, 1000);
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

document.getElementById("exBtn").addEventListener("click", function() {
  exampleGraph();
});

function constructTable(nodes) {
  var str = "";
  str += '<table id="dijkTable" style="width:100%"><tr><th>Nodes</th><th>Known</th><th>Distance</th><th>Path</th></tr>';
  for (node in nodes) {
    if (nodes[node].dist < 0) {
      var dist = "Infinity";
    } else {
      var dist = nodes[node].dist;
    }
    if (nodes[node].path !== null) {
      var path = nodes[node].path.source.idx;
    } else {
      var path = nodes[node].path;
    }
    str += '<tr><td>' + nodes[node].idx + '</td><td>' + nodes[node].known + '</td><td>' + dist + '</td><td>' + path + '</td></tr>';
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

  realGraph.nodes[start].dist = 0;
  var q = [];
  q.push(realGraph.nodes[start]);

  while (!realGraph.checkKnown(q)) {
    // Find min distance of unknown vertex and set v.known to true
    var min = -1;
    var minIdx = -1;
    for (node in q) {
      if (min < 0 && !q[node].known) {
        min = q[node].dist;
        minIdx = node;
      } else if (q[node].dist < min && !q[node].known) {
        min = q[node].dist;
        minIdx = node
      }
    }
    v = q[minIdx];
    v.known = true;

    for (link in v.adjList) {
      if (!v.adjList[link].target.known) {
        var cost = v.adjList[link].weight;

        if (v.dist + cost < v.adjList[link].target.dist) {
          v.adjList[link].target.dist = v.dist + cost;
          v.adjList[link].target.path = v.adjList[link];
          q.push(v.adjList[link].target);
        } else if (v.adjList[link].target.dist < 0) {
          v.adjList[link].target.dist = v.dist + cost;
          v.adjList[link].target.path = v.adjList[link];
          q.push(v.adjList[link].target);           
        }
      }
    }
    htmlStrings.push(constructTable(realGraph.nodes));
  }
  console.log(htmlStrings);
  
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

var algorithms = "<div class='algCon'>" +
"<h3>Dijkstras</h3>" + 
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



