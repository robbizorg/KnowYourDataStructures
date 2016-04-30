var linkedList = function ll() {
	function nodeClass(element, next) {
		return {
			element: element,
			next: next
		}
	};

	var head = nodeClass("head", null);
	var size = 0;

	var insert = function insertF(element) {
		var temp = head.next;
		head.next = nodeClass(element, temp);
		size++;
	};
 
	var remove = function removeF() {
		head.next = head.next.next;
		size--;
	}

	var printAll = function() {
		print(head.next);
	}

	var getSize = function sizef() {
		return size;
	}

	var getElements = function() {
		var elementArr = [];
		var currentNode = head.next;

		while (currentNode !== null) {
			elementArr.push(currentNode.element);
			currentNode = currentNode.next;
		}

		return elementArr;
	}

	// Private Functions
	var print = function printOne(node) {
		if (node !== null) {
			console.log(node.element);	
			printOne(node.next);		
		}
	}

	return {
		insert: insert,
		print: printAll,
		remove: remove,
		size: getSize,
		getElements: getElements
	}
};

function doublyLinkedList() {
	function nodeClass(element, next, prev) {
		return {
			element: element,
			next: next,
			prev: prev
		}
	};

	var head = nodeClass(null, null, null);
	var tail = nodeClass(null, null, head);
	head.next = tail;
	size = 0;

	var insertFront = function insertF(element) {
		var temp = head.next;
		head.next = nodeClass(element, temp, head);
		head.next.next.prev = head.next;
		size++;
	};

	var insertBack = function insertBack(element) {
		var temp = tail.prev;
		tail.prev = nodeClass(element, tail, temp);
		tail.prev.prev.next = tail.prev;
		size++;
	}
 
	var remove = function removeF() {
		head.next = head.next.next;
		size--;
	}

	var printAll = function() {
		print(head.next);
	}

	var print = function printOne(node) {
		if (node !== null) {
			console.log(node.element);	
			printOne(node.next);		
		}
	}

	return {
		insertFront: insertFront,
		insertBack: insertBack,
		printAll: printAll
	}

}

function graph() {
	var nodes = [];
	var links = [];
  var weighted = true;

	function newNode(element, source) {
		nodes.push({"element": element, "adjList": []});

		if (source === undefined) {
			if (nodes.length > 1) {
				//links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      if (nodes.length > 1) {
        if (weighted)
          links.push({"source": parseInt(source), "target": (nodes.length - 1), "weight": 0});
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
      console.err("REMOVE ERR: No source provided");
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
    if (weighted != true) {
      return false;
    } else {
      return true;
    }

  }

  function shortestPathUnweighted() {
    
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