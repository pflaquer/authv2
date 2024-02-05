var map = null;
var buskers = [];
let latitude;
let longitude;
let isLoggedIn = false;
let state = false;
let index = [];
let user;


if(isLoggedIn!= false){
  document.body.innerHTML = App()
}
else{document.body.innerHTML = Login()}

//
function App(x){

  return `
  
  
  <div id="view">

<div id="mapa">
	
	
	<div id="map"></div>
</div>
  </div>
 
  <nav action="">
    <ul>
    <li class="navitem"><img class="profile" src=${x}></img></li>
      <li class="navitem"><i class="fa-solid fa-house navs" onclick="handleClick(this.key)" key="Home"></i></li>
      <li class="navitem"><i class="fa-solid fa-magnifying-glass navs" onclick="handleClick(load)"></i></li>
      <li><i class="fa-solid fa-location-dot navs" id="pulse"></i>
      
      <li><i class="fa-solid fa-right-from-bracket navs" onclick="logOut()"></i></li>
    </ul>
     <div id="log" class="log"></div>
  </nav>
  
  
  
  `
;
  loadMaps()

}

  

function Login(){
  return `
  <div class="login-container">
    <img src="https://cdn-icons-png.flaticon.com/128/9954/9954005.png" alt="User Icon">
    <h1>Login</h1>
    <form id="login-form">
      <div class="input-container">
        <input type="text" id="username" placeholder="Username" required>
      </div>
      <div class="input-container">
        <input type="password" id="password" placeholder="Password" required>
      </div>
      <!--<div class="g-signin2" data-onsuccess="handleCredentialResponse"></div>-->
      <!--<button type="submit">Login →</button>-->

<div id="g_id_onload"
     data-client_id="45349294622-clh89uspdjaph48v033evuldh4792e07.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleCredentialResponse"
     data-nonce=""
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>
      
    </form>
    <div class="extra-options">
      <!-- Removed Forgot Password link -->
    </div>
    <div class="credit"> <a href="#" class="credit">All Rights Reserved: ©PXDR0 ↗ </a></div>
  </div>
 <!-- <div>
  <code id="data">
  </div>-->
  
  
  `
}

  function handleCredentialResponse(response) {
     // decodeJwtResponse() is a custom function defined by you
     // to decode the credential response.
    alert('successfully logged in!'+Date());

// function to parse payload portion of JWT


    
     //const responsePayload = decodeJwtResponse(response.credential);
    const responsePayload = response.credential;
    let jwt = response.credential;
    console.log(response)
    console.log(jwt);
//

    let payloadIndex =()=>{
  y = jwt.split('')
  i=0;
  z=0;
  let payloadend;
 y.forEach((x)=>{
   z++
    if(x=='.'){
      payloadend = z;
      //console.log(payloadend);
      index.push(payloadend);
    }
   else{return null};   
    });
  }
payloadIndex()

console.log(index);
    //console.log(jwt.split(''));



    
    //let jwt = response.credential;
  let header = jwt.split('').slice(0,jwt.indexOf('.')).join('');
    let payload = jwt.split('').slice(...index,...index)
    payload.length--
    
payload = payload.join('');
payload = atob(payload);
    payload = JSON.parse(payload)
   user = payload;
    console.log(atob(header));
  console.log(payload);

     console.log("ID: " + payload.sub);
    console.log("ID: " + user.sub);
     console.log('Full Name: ' + user.name);
     console.log('Given Name: ' + payload.given_name);
     console.log('Family Name: ' + payload.family_name);
     console.log("Image URL: " + user.picture);
     console.log("Email: " + payload.email);
   
    document.body.innerHTML = App(user.picture);
    loadMaps()
  }

  
  
  
  

 function signOut() {
   try{
     alert('starting!')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(
      function () {
      alert('User signed out.');
    });
  }
   catch(e){
     alert('Failed')
   }
 }


function loadMaps() {
  alert('Rendering...')
  //var map = null;

  window.onload = function() {
	
	var myOptions = {
	
		center: new google.maps.LatLng(40.6958, -73.9120),
		zoom: 13,
		scrollwheel: false,
		disableDefaultUI: true,
	};

	map = new google.maps.Map(document.getElementById("map"), myOptions);

let buskers = [
	{lat: 40.6958, lng: -73.9171},
	{lat: 40.6960, lng: -73.9120}

];
  
  console.log(buskers)

buskers.forEach((x)=>{
	var sucursal1 = new google.maps.Marker({
		position: x,
		map: map,
		animation: google.maps.Animation.DROP,
    title:'Artist: Lil Wayne, Genre: Hiphop, Soundcloud: www.soundcloud.com/lilwayne'
		//icon: img
	});
}
);

};

//let state = false;


function broadcast(x){
if(state==true){
  x = new google.maps.Marker({
		position: {lat: 40.700, lng: -73.9171},
    //{lat: parseInt(window.prompt('Insert Lat')), lng: parseInt(window.prompt('Insert Long'))},
		map: map,
		animation: google.maps.Animation.DROP,
    title:'Artist: Lil Wayne, Genre: Hiphop, Soundcloud: www.soundcloud.com/lilwayne'
		//icon: img
	});
}
  else{alert('Busking Ended!')}
  
}

var point = new google.maps.LatLng(40.7010, -73.9120);
    var data = "Hello World!";
    var infowindow = new google.maps.InfoWindow({
      content: data
    });


    var marker = new google.maps.Marker({
        position: point,
        title:"Hello World!"
    });



google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });


let counter = 0;
/*
    const socket = io({
      auth: {
        serverOffset: 0
      },
      ackTimeout: 10000,
      retries: 3,
    });

    const btn = document.getElementById('broadcast');


    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if(state==true){
    
        const clientOffset = `${socket.id}-${counter++}`;
        socket.emit('chat message', window.prompt('Input Coordinates'), clientOffset);
      }
      else{}
      
    });

    socket.on('chat message', (msg, serverOffset) => {
      
      
       new google.maps.Marker({
		position: {lat: 40.700, lng: -73.9171},
    //{lat: parseInt(window.prompt('Insert Lat')), lng: parseInt(window.prompt('Insert Long'))},
		map: map,
		animation: google.maps.Animation.DROP,
		//icon: img
	});

      
      
    });
*/
function handleClick(e){
  //alert(JSON.stringify(e))
  view.innerHTML = Home();
}

function Home(){
  return 'You Are Home'
}


const view = document.getElementById("view");
/*
document.querySelector("#navitem").forEach((x)=>{
  x.onclick = alert('Clicked')
})
*/


let btns = document.getElementById("pulse")

btns.onclick = (e)=>{
  alert('working')
  send()
  btns.classList.toggle('button-ani');
  console.log(e);
  state = !state;
  alert('Busking Status Set to '+state);
	buskers.push(this);	
	let msg = 'Currently Busking='+buskers.length;
  
   new google.maps.Marker({
		position: {lat: 40.700, lng: -73.9171},
    //{lat: parseInt(window.prompt('Insert Lat')), lng: parseInt(window.prompt('Insert Long'))},
		map: map,
		animation: google.maps.Animation.DROP,
		//icon: img
	});
	
}


let wsUri = "wss://socketsbay.com/wss/v2/1/b82aefd80dfc40b5c084ae38a67f6025/";
let log;

function init()
    {
      log = document.getElementById("log");
      testWebSocket();
    }

    function testWebSocket()
    {
      websocket = new WebSocket(wsUri);
      websocket.onopen    = function(e) { onOpen(e)    };
      websocket.onclose   = function(e) { onClose(e)   };
      websocket.onmessage = function(e) { onMessage(e) };
      websocket.onerror   = function(e) { onError(e)   };
    }

    function onOpen(e)
    {
      writeLog("CONNECTED");
      //alert('Connected!')
      console.log(JSON.stringify(e))
     
    }

    function onClose(e)
    {
      writeLog("Websocket DISCONNECTED");
      
    }

    function onMessage(e)
    {
      writeLog('New Connection: ' + e.data );
      websocket.close();
    }

    function onError(e)
    {
      writeLog('ERROR: ' + e.data);
    }

    function sendMessage(message)
    {
      if(websocket.readyState==1){
      writeLog(`${Date.now()}: ${message} `);
      websocket.send(message);
      }
    }
//
//

    function writeLog(message)
    {
let newmsg = document.createElement('p');
      newmsg.innerHTML = message
      log.appendChild(newmsg)
    }
function send(x){
  //x = window.prompt('Enter Text')
  x = latitude+','+longitude
  console.log(latitude)
  sendMessage(x);
  console.log(websocket.bufferedAmount)
  //each character is one byte

  
}

init();

//console.log(websocket.readyState)

//

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
latitude = crd.latitude;
 longitude = crd.longitude;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  //console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

  
  
}
