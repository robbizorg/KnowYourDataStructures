function node(svg) {

}

function edge(svg, source, target) {

}

function graph() {
	var nodes = [];
	var links = [];

	function newNode(element, source) {
		nodes.push({"element": element});

		if (source === undefined) {
      console.log(source);
			if (nodes.length > 1) {
				links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      console.log(source);
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
	

	return {
		nodes: nodes,
		links: links,
		newNode: newNode,
    addLink: addLink
	}
}

var realGraph = graph();
realGraph.newNode("chris");
realGraph.newNode("bob");
realGraph.newNode("tim", 0);
console.log(realGraph.nodes);
console.log(realGraph.links);

var force = d3.layout.force()
    .charge(-100)
    .linkDistance(100)
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
      .text(function(d) { return d.index; });

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

  force.charge(-100)
    .linkDistance(100).start();

  console.log(force.nodes());

  link
    .data(realGraph.links)
    .enter().insert("line", ":first-child")
      .attr("class", "link")

  node
    .data(realGraph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .append("circle")
    .attr("r", 10)
  d3.selectAll('.node')
    .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { console.log(d); return d.index; });
    

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

  console.log(force.links());

  link
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