$(function () {
    console.log( "ready!" );
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //alert("This browser supports file loading...");
      //return read file to textinput area
      $('#load-text-file').change(function(evt) { 
        console.log(evt)
        return handleFileSelect(evt, $('#textInput')); 
      });
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }
 );

//Download as .txt file
function saveText(ref, fname, text, mime)
{
  var blob = new Blob([text], {type: mime});
  saveAs(blob, fname);
  return false;
}

// This is fired when user uploads a txt file in line 7
// Get file contents & chuck it to div with #textInput ID
function handleFileSelect(evt, target)
{
  var files = evt.target.files;
  if( files.length > 1 )
  {
    alert("Multiple files not supported...");
  }

  // alert(JSON.stringify(files,null,2));
  
  file = files[0];
  // file variable now contains lastModifiedDatme, name, size

  $(evt.target).prev('.file-details').html(file.name + " " + " size " + file.size + " type " + file.type + " last modified " + file.lastModifiedDate );

  // FileJS function?
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (
    function(theFile)
    {
      return function(e)
      {
        target.html( e.target.result );
        console.log( e.target.result)
      };
    }
  )(file);

  // Read in the image file as a data URL.
  reader.readAsText(file);
}
