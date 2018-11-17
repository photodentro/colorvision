/*
Copyright (C) 2018 Alkis Georgopoulos <alkisg@gmail.com>.
SPDX-License-Identifier: CC-BY-SA-4.0
*/
var act = null;  // activity object, see initActivity()

// ES6 string templates don't work in old Android WebView
function sformat(format) {
  var args = arguments;
  var i = 0;
  return format.replace(/{(\d*)}/g, function sformatReplace(match, number) {
    i += 1;
    if (typeof args[number] !== 'undefined') {
      return args[number];
    }
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
    return match;
  });
}

function ge(element) {
  return document.getElementById(element);
}

function onToggleFullScreen(event) {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen
    || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen
    || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement
    && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

function onColorChange(event) {
  var red = parseInt(ge('red').value, 10);
  var green = parseInt(ge('green').value, 10);
  var blue = parseInt(ge('blue').value, 10);

  ge('redlight').style.fill = sformat('rgb({},0,0)', red);
  ge('greenlight').style.fill = sformat('rgb(0,{},0)', green);
  ge('bluelight').style.fill = sformat('rgb(0,0,{})', blue);
  ge('combinedlight').style.fill = sformat('rgb({},{},{})', red, green, blue);
}

function onHome(event) {
  window.history.back();
}

function onHelp(event) {
  alert('Επιλέξτε την ποσότητα κόκκινου, πράσινου και μπλε από τους ροοστάτες δεξιά, για να συνθέσετε το κεντρικό χρώμα.');
}

function onAbout(event) {
  window.open('credits/index_DS_II.html');
}

function onResize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w / h < 640 / 360) {
    document.body.style.fontSize = sformat('{}px', 10 * w / 640);
  } else {
    document.body.style.fontSize = sformat('{}px', 10 * h / 360);
  }
}

function addEvents() {
  document.body.onresize = onResize;
  ge('bar_home').onclick = onHome;
  ge('bar_help').onclick = onHelp;
  ge('bar_about').onclick = onAbout;
  ge('bar_fullscreen').onclick = onToggleFullScreen;
  ge('red').onchange = onColorChange;
  ge('red').oninput = onColorChange;
  ge('green').onchange = onColorChange;
  ge('green').oninput = onColorChange;
  ge('blue').onchange = onColorChange;
  ge('blue').oninput = onColorChange;
}

function initActivity() {
  if (!act) {  // first run
    addEvents();
  }
  act = {};
  onColorChange();
  onResize();
}

window.onload = initActivity;
