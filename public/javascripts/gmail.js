// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '920068089416-onhjm1li4culs8m543s50e5fgemuc3kf.apps.googleusercontent.com'
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
/**
* Check if current user has authorized this application.
*/
function checkAuth() {
  gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult)
}
/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div')
	if (authResult && !authResult.error) {
		// Hide auth UI, then load client library.
		authorizeDiv.style.display = 'none'
		loadGmailApi();
	} else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline'
	}
}
/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
	gapi.auth.authorize(
	{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	handleAuthResult);
	return false
}
/**
* Load Gmail API client library. List labels once client library
* is loaded.
*/
function loadGmailApi() {
	gapi.client.load('gmail', 'v1', listMessages)
}
/**
* Print all Labels in the authorized user's inbox. If no labels
* are found an appropriate message is printed.
*/
function listLabels() {
	var request = gapi.client.gmail.users.labels.list({
		'userId': 'me'
	})

	request.execute(function(resp) {
		var labels = resp.labels;
		appendPre('Labels:');
		if (labels && labels.length > 0) {
			for (i = 0; i < labels.length; i++) {
				var label = labels[i];
				appendPre(label.name)
			}
		} else {
			appendPre('No Labels found.');
		}
	})
}

function getMessage(messageid) {
	var request = gapi.client.gmail.users.messages.get({
		'userId': 'me',
		'id': messageid
	})

	request.execute(function(resp) {
		appendPre(resp.snippet)
		console.log('hi')
	})
}
/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
	var pre = document.getElementById('output')
	var li = document.createElement('li')
	li.className = 'list-group-item'
	var ul = document.createElement('ul')
	ul.className = 'list-group'
	var textContent = document.createTextNode(message + '\n')
	li.appendChild(textContent)
	ul.appendChild(li)
	pre.appendChild(ul)
}




function listMessages() {
  var getPageOfMessages = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.messages);
      result.forEach(function(obj){
      	getMessage(obj.id)
      })
    });
  };
  var initialRequest = gapi.client.gmail.users.messages.list({
    'userId': 'me'
  });
  getPageOfMessages(initialRequest, []);
}











