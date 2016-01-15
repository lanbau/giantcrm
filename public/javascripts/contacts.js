// function auth() {
//   var config = {
//     'client_id': '920068089416-onhjm1li4culs8m543s50e5fgemuc3kf.apps.googleusercontent.com',
//     'scope': 'https://www.google.com/m8/feeds'
//   };
//   gapi.auth.authorize(config, function() {
//     fetch(gapi.auth.getToken());
//   });
// }
// function fetch(token) {
//   console.dir(token)
//   $.ajax({
//     url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json',
//     dataType: 'jsonp',
//     data: token
//   }).done(function(data) {
//     var contacts = data.feed.entry
//     contacts.forEach(function(e){
//       console.log(e.title.$t)
//     })
//   });
// }

var clientId = '920068089416-onhjm1li4culs8m543s50e5fgemuc3kf.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/contacts.readonly';
$(document).on("click",".googleContactsButton", function(){
 window.setTimeout(authorize);
});
function authorize() {
 gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthorization);
}
function handleAuthorization(authorizationResult) {
 if (authorizationResult && !authorizationResult.error) {
   $.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=500&v=3.0",
     function(response){
       //process the response here
       response.feed.entry.forEach(function(entry){
         if(entry.title.$t !== ''){
           document.getElementById('authorize-div').style.display = 'none'
           appendPre(entry.title.$t)
         }
       })

     });
 }
}

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
