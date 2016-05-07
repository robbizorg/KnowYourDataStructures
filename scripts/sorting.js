function pmergeSort(a, tmpArr, left, right, steps) {
	// Steps will be a 2D array where the second dimension contains
	// two objects, the first table of the items and then the second
	// table of the merges
	// ex: [[table1,table2],[table1.2,table2.2]]
	
	if (left < right) {
		var center = Math.floor((left + right) / 2);
		pmergeSort(a, tmpArr, left, center, steps);
		pmergeSort(a, tmpArr, center + 1, right, steps);
		merge(a, tmpArr, left, center + 1, right, steps);
	}
}

function mergeSort(arr) {
	var tmpArr = [];
	for (element in arr) {
		//tmpArr[element] = null;
	}

	var steps = [];

	pmergeSort(arr, tmpArr, 0, arr.length - 1, steps);
	
	console.log("Post Sorting");
	console.log(arr);
	steps.push(mergeConstructTable(arr, tmpArr));
	return steps;
}

// merge Routine, helper to mergeSort()
function merge(a, tmpArr, left, right, rightEnd, steps) {
	var leftEnd = right - 1;
	var tmpPos = left;
	var elements = rightEnd - left + 1;

	steps.push(mergeConstructTable(a, tmpArr));

	while (left <= leftEnd && right <= rightEnd) {
		if (a[left] < a[right]) {
			tmpArr[tmpPos++] = a[left++];
			steps.push(mergeConstructTable(a, tmpArr));
		} else {
			tmpArr[tmpPos++] = a[right++];
			steps.push(mergeConstructTable(a, tmpArr)); 
		}
	}

	// Got to copy over all the other elements
	while (left <= leftEnd) {
		tmpArr[tmpPos++] = a[left++];
		steps.push(mergeConstructTable(a, tmpArr));
	}

	while (right <= rightEnd) {
		tmpArr[tmpPos++] = a[right++];
		steps.push(mergeConstructTable(a, tmpArr));
	}

	// Copy the temp array back to a
	for (var i = 0; i< elements; i++, rightEnd--) {
		a[rightEnd] = tmpArr[rightEnd];
	}
	steps.push(mergeConstructTable(a, tmpArr));
}

function quickSort() {

}

function selectionSort() {

}

// Merge Sort Construct Table
function mergeConstructTable(a, tmpArr) {
	table = "";
	table += '<table style="width:100%" id="mergeTable"><tr><th>Array</th>';
	for (element in a) {
		table += '<td>' + a[element] + '</td>';
	}
	table += '</tr><tr><th>Temp Array</th>';
	for (element in tmpArr) {
		table += '<td>' + tmpArr[element] + '</td>';
	}
	table += '</tr></table>';

	return table;
}

var mergeBtn = document.getElementById("mergeSort");
mergeBtn.addEventListener("click", function mergeHandler() {
	var exampleArr = [5, 2, 3, 6, 1];
	var merges = mergeSort(exampleArr);
	var currentStep = 0;

	$("#results").append("<div class='row dijkHead' id='steps'><h4>Results: </h4>" + 
        "<button class='btn' id='prevStep'>Previous Step</button>" +
        "<button class='btn' id='nextStep'>Next Step</button>" +
     "</div>");

	$("#results").append(merges[currentStep]);
      var prev = document.getElementById("prevStep");
      prev.addEventListener("click", function prevHandler() {
        if (currentStep != 0) {
          $("#mergeTable").remove();
          $("#results").append(merges[--currentStep]);
        }
      });

      var next = document.getElementById("nextStep");
      next.addEventListener("click", function prevHandler() {
        if (currentStep != merges.length - 1) {
          $("#mergeTable").remove();
          $("#results").append(merges[++currentStep]);
        	console.log(currentStep);
        }
      });
});

// Example Table String '<table style="width:100%"><tr><th>First</th><th>Last</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td> <td>50</td></tr><tr><td>Eve</td><td>Jackson</td> <td>94</td></tr></table>' +
// HTML TEXT
var about = "<h3>Sorting</h3><p>Everybody's gotta learn it, even if you're never going to implement it in your life. Welcome " +
"to Sorting, where everything is lower bound and you try and improve performance by even a fraction of a millisecond. Here there are " +
"a couple fundamental algorithms you're going to need to know to get your feet off the ground. We'll go from the just awful algorithms to the" +
"well we did our best ones. Here we go. </p>";

var applications = "<h3>Applications of Sorting</h3><p>We use sorting algorithms to, well, sort things. The object of this game is to " +
"sort things as fast as possible. Points go to the ones who can figure out how to do it the best. "

var costs = "<h3>Costs of Sorting</h3><p>Oh God, we'll get to this one later...</p>";