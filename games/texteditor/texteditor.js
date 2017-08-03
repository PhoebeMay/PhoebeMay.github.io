var title;
var body;
var filePannel;
var appearancePannel;
var backgroundButton;
var colorPicker;
var cookies;


document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){
  title = document.getElementById('title');
  body = document.getElementById('body');
  filePannel = document.getElementById('file-input');
  appearancePannel = document.getElementById("appearance_pannel");
  backgroundButton = document.getElementById('backgroundButton');
  colorPicker = document.getElementById('colorPicker');
  cookies = document.cookie;
  appearancePannel.style.display = 'none';

  console.log("Your cookie was "+cookies);

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

  document.getElementById("header-size").addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
     var size = document.getElementById("header-size").value;
     document.getElementById("title").style.fontSize = size + 'px';
     setCookie('TitleFontSize', size );
    }
  });

  document.getElementById("body-size").addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
     var size = document.getElementById("body-size").value;
     document.getElementById("body").style.fontSize = size + 'px';
     setCookie('BodyFontSize', size );
    }
  });

  document.getElementById("page-width").addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
     var width = document.getElementById("page-width").value.replace("%", "");
    // console.log("width specified as " + width )
     var margin = (100 - width)/2;
    // console.log("margin is now " + margin)

     if (isNaN(margin)) {
       // console.log("Invalid input format for changing page width, please enter a percentage")
        document.getElementById("page-width").value = 80 + "%";
     }
     else {
      document.getElementById("editor").style.marginLeft = margin + "%";
      document.getElementById("editor").style.marginRight = margin + "%";
      setCookie('PageWidth',width);
    }
  }});

  getCookieSettings();
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
  var d = new Date();
  var exdays = 60;
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  //;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function download() {
  var title_text = document.getElementById('title').innerText;
  var body_text = document.getElementById('body').innerText;
  var text = title_text + '\r\n\r\n' + body_text;
  var filename = "my_text";
  if (title_text !== "") {
    filename = title_text.split(' ').join('_');
  }
  var blob = new Blob([text], {type: "text/plaincharset=utf-8"});
  saveAs(blob, filename+".txt");
}

function loadText(event) {

  var input = event.target;
  var reader = new FileReader();

  reader.onload = function(){
    var text = reader.result;
    var pivot = text.indexOf("\r\n\r\n");
    var body = "Page content";
    var title = "Page Title";

    if (pivot > 800) {
      body = text;
    }

    else {
      if (pivot === -1) {
        pivot = text.indexOf("\n\n");
        if (pivot == -1) {
          body = text;
        }
        else {
          if (pivot > 800) {
              body = text;
          }
          else{
            title = text.substring(0,pivot);
            body = text.substring(pivot+2);
          }
        }
      }
      else {
        title = text.substring(0,pivot);
        body = text.substring(pivot+4);
      }
    }
    document.getElementById('title').innerText = title;
    document.getElementById('body').innerText = body;
  }

  reader.readAsText(input.files[0]);
}

function getCookieSettings() {

  //Set up colors
  var backgroundColor = getCookie('BackgroundColor');
  var textColor = getCookie('TextColor');

  if ((backgroundColor !== "")) {
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById("backgroundColorPicker").value = backgroundColor.substring(1);
  }

  if ((textColor !== "")) {
    document.getElementById("editor").style.color = textColor;
    document.getElementById("textColorPicker").value = textColor.substring(1);
  }

  //Set up font sizes
  document.getElementById("title").style.fontSize = getCookie('TitleFontSize') + 'px';
  document.getElementById("body").style.fontSize = getCookie('BodyFontSize') + 'px';

  document.getElementById("header-size").value = getCookie('TitleFontSize');
  document.getElementById("body-size").value = getCookie('BodyFontSize');

  if (document.getElementById("header-size").value === "") {
    //No stored cookie so  use default value
    document.getElementById("header-size").value = "40";
  }

  if (document.getElementById("body-size").value  === "") {
    //No stored cookie so use default value
    document.getElementById("body-size").value = "20";
  }

  //Set up page width
  var margin = (100 - getCookie("PageWidth"))/2;

  if (getCookie("PageWidth") === ""){
    //No stored cookie so use default value
   // console.log("Using default settings")
    document.getElementById("editor").style.marginLeft = "10%";
    document.getElementById("editor").style.marginRight = "10%";
     document.getElementById("page-width").value = "80%";
  }
  else {
    document.getElementById("editor").style.marginLeft = margin + "%";
    document.getElementById("editor").style.marginRight = margin + "%";
    document.getElementById("page-width").value = getCookie("PageWidth") + "%";
  }
}
