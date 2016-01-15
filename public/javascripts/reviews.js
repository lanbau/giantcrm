google.load('visualization', '1.0', {'packages':['corechart']})

// // Set a callback to run when the Google Visualization API is loaded.
// google.setOnLoadCallback(drawChart)

function drawChart(array) {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Percentage');
        data.addRows(array);

        // Set chart options
        var options = {'title':'Are Your Customers Angry?',
                       'width':600,
                       'height':500};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
}

fetch('https://crossorigin.me/https://www.tripadvisor.com.sg/Hotel_Review-g294265-d4116146-Reviews-Dorsett_Singapore-Singapore.html .partial_entry')
	.then(function (res) {
		return res.text()
	}).then(function (body) {
		var el = document.createElement('html')
		el.innerHTML = body
		var newel = el.querySelectorAll('.partial_entry') // Live NodeList of your anchor elements

		var nodesArray = [].slice.call(newel)
		var nodeText = []
		nodesArray.forEach(function (obj) {
			var cleanObj = obj.textContent.replace(/(\r\n|\n|\r)/gm, '')
			nodeText.push(cleanObj)
		})
		console.log(nodeText)
		var nodeReviews = nodeText.join()
		console.log(nodeReviews)

		fetch('/reviews', {
		  method: 'post',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		    name: nodeReviews,
		    login: 'hubot',
		  })
		}).then(function(response) {
    	return response.json()
  	}).then(function(json) {
    	console.log('parsed json', json.tree.children)
			var emo = json.tree.children[0].children[0].children[4].children
			var arrEmo = []
			var arr1 = []
			arr1.push(emo[0].name, emo[0].percentage)
			var arr2 = []
			arr2.push(emo[1].name, emo[1].percentage)
			var arr3 = []
			arr3.push(emo[2].name, emo[2].percentage)
			var arr4 = []
			arr4.push(emo[3].name, emo[3].percentage)
			var arr5 = []
			arr5.push(emo[4].name, emo[4].percentage)

			arrEmo.push(arr1)
			arrEmo.push(arr2)
			arrEmo.push(arr3)
			arrEmo.push(arr4)
			arrEmo.push(arr5)
			console.log(arrEmo)


			drawChart(arrEmo)
  	})

  	// saveText(this, 'reviews', nodeReviews, 'text/plain;charset=utf-8')
	});

function saveText(ref, fname, text, mime)
{
  var blob = new Blob([text], {type: mime})
  saveAs(blob, fname)
  return false
}

// dquery addlistener
// submit event.preventdefault
// fetch post -> to node.
