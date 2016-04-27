function node(svg) {

}

function edge(svg, source, target) {

}

function graph() {
	var nodes = [];
	var links = [];

	function newNode(element, source) {
		nodes.push({"element": element, "adjList": []});

		if (source === undefined) {
			if (nodes.length > 1) {
				//links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      if (nodes.length > 1) {
        links.push({"source": parseInt(source), "target": (nodes.length - 1)})
      }
    }

  }
  
  function addLink(source, target) {
    if (source === undefined || target === undefined) {
      return undefined;
    } else {
      links.push({"source": parseInt(source), "target": parseInt(target)});
    }
  }

  function remove(source) {
    if (source === undefined || source === "") {
      console.err("REMOVE ERR: No source provided")
    } else {
      var index = parseInt(source);
      if (index > -1) {
        for (var link = 0; link < links.length; link++) {
          if (links[link].source.index == index || links[link].target.index == index) {
            links.splice(link, 1);
            link--;
          }
        }

        // DELETING ACTS VERY VERY STANGELY
        nodes.splice(index, 1);
      }
    }
  }

  // Graph Algorithms
  function dijkstras() {

  }

  function topSort() {

  }

  function mst() {

  }
	

	return {
		nodes: nodes,
		links: links,
		newNode: newNode,
    addLink: addLink,
    remove: remove
	}
}

var realGraph = graph();
realGraph.newNode("HEAD");
console.log(realGraph.nodes);
console.log(realGraph.links);

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
      .text(function(d) { return d.element + "/" + d.index; });

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
  
  console.log(realGraph.nodes);
  console.log(realGraph.nodes[realGraph.nodes.length - 1]);
  console.log(realGraph.links[realGraph.links.length - 1]);

  force.nodes(realGraph.nodes);
  force.links(realGraph.links);

  force.charge(-200)
    .linkDistance(150).start();

  console.log(force.nodes());

  svg.selectAll('.link')
    .data(realGraph.links)
     .enter().insert("line", ":first-child")
      .attr("class", "link")

  svg.selectAll('.node')
    .data(realGraph.nodes)
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
      .text(function(d) { console.log(d); return d.element + "/" + d.index;});
    

  force.on("tick", function() {
    d3.selectAll(".link").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

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
  svg.selectAll('.node').data(realGraph.nodes).exit().remove();

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



