  var title = document.getElementById('title');
  var body = document.getElementById('body');
  var filePannel = document.getElementById('file-input');
  var appearancePannel = document.getElementById("appearance_pannel");
  var backgroundButton = document.getElementById('backgroundButton');
  var colorPicker = document.getElementById('colorPicker');



  try {
    //chrome and safari
    title.contentEditable = 'plaintext-only';
    body.contentEditable = 'plaintext-only';
  }
  catch (err) {
    //support for firefox and other browsers

    title.contentEditable = 'true';
    body.contentEditable = 'true';

    document.addEventListener("paste", function(e) {
        // cancel paste
        e.preventDefault();

        // get text representation of clipboard
        var text = e.clipboardData.getData("text/plain");

        // insert text manually
        document.execCommand("insertHTML", false, text);
      });
  }



  function toggleAppearanceControl() { 
    if (appearancePannel.style.display === 'none') {
        appearancePannel.style.display = 'block';
    } 
    else {
        appearancePannel.style.display = 'none';
    }
  }


  function updateBackground(jscolor) {
    document.body.style.backgroundColor = '#' + jscolor;
    setCookie('BackgroundColor', '#' + jscolor);
  }


  function updateTextColor(jscolor) {
    document.getElementById("editor").style.color = '#' + jscolor;
    setCookie('TextColor','#' + jscolor);
  }

  function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
  }

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function download() {
    var header_text = document.getElementById('title').innerText;
    var body_text = document.getElementById('body').innerText;
    var text = header_text + '\r\n\r\n' + body_text;
    var filename = "my_text";
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".txt");
  }

function openFile(event) {

        var input = event.target;
        var reader = new FileReader();

        reader.onload = function(){
          var text = reader.result;
          var pivot = text.indexOf("\r\n\r\n");
 

          var header = text.substring(0,pivot);
          var body = text.substring(pivot+4);

          document.getElementById('title').innerText = header;
          document.getElementById('body').innerText = body;

        };

        reader.readAsText(input.files[0]);

  };

function getCookieColors() {
    var backgroundColor = getCookie('BackgroundColor');
    var textColor = getCookie('TextColor')

    if (backgroundColor === "") {

    }
    else {
      document.body.style.backgroundColor = backgroundColor;
      document.getElementById("backgroundColorPicker").value = backgroundColor.substring(1);
    }

    if (textColor === "") {

    }
    else {
      document.getElementById("editor").style.color = textColor;
      document.getElementById("textColorPicker").value = textColor.substring(1);
    }

    document.getElementById("title").style.fontSize = getCookie('TitleFontSize');
    document.getElementById("body").style.fontSize = getCookie('BodyFontSize');

    document.getElementById("header-size").value = getCookie('TitleFontSize');
    document.getElementById("body-size").value = getCookie('BodyFontSize');

    if (document.getElementById("header-size").value === "") {
      document.getElementById("header-size").value = "36px";
    }

    if (document.getElementById("body-size").value  === "") {
      document.getElementById("body-size").value = "14px";
    }




  }

document.getElementById("header-size").addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        try {
         var size = document.getElementById("header-size").value;
         document.getElementById("title").style.fontSize = size;
         setCookie('TitleFontSize', size );
        }
        catch (err) {console.log(err);}
    }
  });

document.getElementById("body-size").addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        try {
         var size = document.getElementById("body-size").value;
         document.getElementById("body").style.fontSize = size;
         setCookie('BodyFontSize', size );
        }
        catch (err) {console.log(err);}
    }
  });


document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){
   getCookieColors();
     appearancePannel.style.display = 'none';
}



