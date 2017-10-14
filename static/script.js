var config = {
  apiKey: "AIzaSyBqbgRVPkr7-t71RqpM47V6HEC3rsq83G8",
  authDomain: "smartdesk-5705d.firebaseapp.com",
  databaseURL: "https://smartdesk-5705d.firebaseio.com",
  projectId: "smartdesk-5705d",
  storageBucket: "smartdesk-5705d.appspot.com",
  messagingSenderId: "166438428269"
};
firebase.initializeApp(config);
var key = firebase.database().ref('gyro')
var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // var update = {}
  // var keyval = '/gyro/' + key + '/input/' + new Date().getTime();
  // update[keyval] = { 'beta': x, 'gamma': y}
  // firebase.database().ref().update(update)

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);