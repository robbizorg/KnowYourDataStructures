function pmergeSort(a, tmpArr, left, right) {
	// Steps will be a 2D array where the second dimension contains
	// two objects, the first table of the items and then the second
	// table of the merges
	// ex: [[table1,table2],[table1.2,table2.2]]
	var steps = [];
	if (left < right) {
		var center = Math.floor((left + right) / 2);
		pmergeSort(a, tmpArr, left, center);
		pmergeSort(a, tmpArr, center + 1, right);
		merge(a, tmpArr, left, center + 1, right);
	}
}

function mergeSort(arr) {
	var tmpArr = [];
	console.log("Pre Sorting");
	console.log(arr);
	pmergeSort(arr, tmpArr, 0, arr.length - 1);
	console.log("Post Sorting");
	console.log(arr);
}

// merge Routine, helper to mergeSort()
function merge(a, tmpArr, left, right, rightEnd) {
	var leftEnd = right - 1;
	var tmpPos = left;
	var elements = rightEnd - left + 1;

	while (left <= leftEnd && right <= rightEnd) {
		if (a[left] < a[right]) {
			tmpArr[tmpPos++] = a[left++];
		} else {
			tmpArr[tmpPos++] = a[right++]; 
		}
	}

	// Got to copy over all the other elements
	while (left <= leftEnd) {
		tmpArr[tmpPos++] = a[left++];
	}

	while (right <= rightEnd) {
		tmpArr[tmpPos++] = a[right++];
	}

	// Copy the temp array back to a
	for (var i = 0; i< elements; i++, rightEnd--) {
		a[rightEnd] = tmpArr[rightEnd];
	}
}

function quickSort() {

}

function selectionSort() {

}

// Example Table String '<table style="width:100%"><tr><th>First</th><th>Last</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td> <td>50</td></tr><tr><td>Eve</td><td>Jackson</td> <td>94</td></tr></table>' +
// HTML TEXT
var about = "<h3>Sorting</h3><p>Everybody's gotta learn it, even if you're never going to implement it in your life. Welcome " +
"to Sorting, where everything is lower bound and you try and improve performance by even a fraction of a millisecond. Here there are " +
"a couple fundamental algorithms you're going to need to know to get your feet off the ground. We'll go from the just awful algorithms to the" +
"well we did our best ones. Here we go. </p>";

var applications = "<h3>Applications of Sorting</h3><p>We use sorting algorithms to, well, sort things. The object of this game is to " +
"sort things as fast as possible. Points go to the ones who can figure out how to do it the best. "

var costs = "<h3>Costs of Sorting</h3><p>Oh God, we'll get to this one later...</p>";