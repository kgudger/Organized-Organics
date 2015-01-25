/** @file main2.js
 *	Purpose:  contains all of the javascript for the index file
 *
 * @author Keith Gudger
 * @copyright  (c) 2014, Keith Gudger, all rights reserved
 * @license    http://opensource.org/licenses/BSD-2-Clause
 * @version    Release: 1.0
 * @package    Test
 *
 */
	var _map = null; // Google Map holder
	var options = {			// Intel GPS options
	    timeout: 10000,
	    maximumAge: 11000,
	    enableHighAccuracy: true
	};
	var currentLatitude = "";
	var currentLongitude = "";
	var directionsDisplay;
	var directionsService;
	var latlng; // global now so driving directions know where to start
	var bounds = new google.maps.LatLngBounds();
	// global now so returning to map fits bounds

	/* Intel native bridge is available */
	/**
	 *	Fires when DOM page loaded
	 */
	function onDeviceReady() {
		console.log("In onDeviceReady");
	    try {
       		if (intel.xdk.device.platform.indexOf("Android") != -1) {
       		    intel.xdk.display.useViewport(480, 480);
//     		    document.getElementById("map_canvas").style.width = "480px";
       		} else if (intel.xdk.device.platform.indexOf("iOS") != -1) {
       		    if (intel.xdk.device.model.indexOf("iPhone") != -1 || intel.xdk.device.model.indexOf("iPod") != -1) {
       		        intel.xdk.display.useViewport(320, 320);
       		        document.getElementById("map_canvas").style.width = "320px";
       			} else if (intel.xdk.device.model.indexOf("iPad") != -1) {
       			    intel.xdk.display.useViewport(768, 768);
       			    document.getElementById("map_canvas").style.width = "768px";
       			}
       		}
       		if (intel.xdk.iswin8) {
       		    document.getElementById("map_canvas").style.width = screen.width + "px";
       		    document.getElementById("map_canvas").style.height = screen.height + "px";
       		}
	        if (intel.xdk.geolocation !== null) {
	            document.getElementById("map_canvas").style.height = (screen.height-250) + "px";
	        }
	    } catch (e) {
	        alert(e.message);
	    }
		try {
	        if (intel.xdk.geolocation !== null) {
     	      intel.xdk.geolocation.watchPosition(suc, fail, options);
				  console.log("geolocation !== null", 4);
			}
		} catch(e) { 
				alert(e.message);
				console.log("geo watch failed",1);
		}
	}; // end of onDeviceReady();

	function ready() {
	    if (navigator.geolocation) {
   	      	navigator.geolocation.getCurrentPosition(showPosition, function() {
				handleNoGeolocation(true);
			});
		document.getElementById("geostat").innerHTML=
			("lat=" + currentLatitude + ", lon=" + currentLongitude);
		} else {
    // Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
	}; // end of ready();

	/** 
	 *	sets current latitude and longitude from ready() function
	 */
	function showPosition(position) {
	    currentLatitude = position.coords.latitude;
	    currentLongitude = position.coords.longitude;
//		console.log("lat=" + currentLatitude + ", lon=" + currentLongitude);36.6502227, lon=-121.79461880000001
	    initialize(); // assigns google map
	};


	/**
	 *	sets up google map to _map
	 *	@param latlngp is latitude and longitude values in array
	 *	latlngp is passed parameter now to prevent confusion
	 */
    function initialize() {
		console.log("In initalize");
//		directionsService = new google.maps.DirectionsService();
		latlngp = new google.maps.LatLng(currentLatitude, currentLongitude); // using global variable now
        var mapCanvas = document.getElementById('map_canvas');
	    var mapOptions = {
			center: latlngp,
			zoomControl: true,
	        zoomControlOptions: {
	            style: google.maps.ZoomControlStyle.SMALL,
//	          position: google.maps.ControlPosition.LEFT_TOP
		    },
    	    zoom: 16,
    	    mapTypeId: google.maps.MapTypeId.TERRAIN
    	};
        _map = new google.maps.Map(mapCanvas, mapOptions);
//		setTimeout("$('#map_canvas').gmap('refresh')",500);
/*		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(_map);
		directionsDisplay.setPanel(document.getElementById('natsinglelist'));*/
		var marker = new google.maps.Marker({
			position: latlngp,
			map: _map,
			title: 'Current Position'
		});
		marker.setMap(_map);
	    var infoWindow;
		var pname;
		var myLatlng;
		var field1Coords = [
			new google.maps.LatLng(36.6502227, -121.7946188),
			new google.maps.LatLng(36.655, -121.7946188),
			new google.maps.LatLng(36.655, -121.79),
			new google.maps.LatLng(36.6502227, -121.79),
			new google.maps.LatLng(36.6502227, -121.7946188)
		];

  // Construct the polygon.
  		cropField1 = new google.maps.Polygon({
		    paths: field1Coords,
		   	strokeColor: '#FF0000',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: '#FF0000',
		    fillOpacity: 0.35,
		    draggable: true,
		    editable: true,
		    geodesic: true
		});

		cropField1.setMap(_map);
		myLatlng = new google.maps.LatLng(36.652, -121.792);
		marker = new google.maps.Marker({
			position: myLatlng,
			map: _map,
			title: 'Current Position'
		});
		marker.setMap(_map);
	    var infoWindow1 = new google.maps.InfoWindow();
		var pname1 = '<div style="color: black;">' + "Field 1<br>" + 
			'date planted: 24 Jan 15<br>' +
			'stock company: MV Seeds<br>' +  
			'lot number: 07bcdi07<br>' +
			'plant type: Beets' +'</div>';
		google.maps.event.addListener(marker, 'click', function() {
  			console.log('Vertex moved on outer path.');
            infoWindow1.setContent(pname1);
        	infoWindow1.open(_map, marker);
		});

		var field2Coords = [
			new google.maps.LatLng(36.6502227, -121.7946188),
			new google.maps.LatLng(36.645, -121.7946188),
			new google.maps.LatLng(36.6449, -121.788),
			new google.maps.LatLng(36.6502227, -121.79),
			new google.maps.LatLng(36.6502227, -121.7946188)
		];

  // Construct the polygon.
  		cropField2 = new google.maps.Polygon({
		    paths: field2Coords,
		   	strokeColor: '#00FF00',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: '#00FF00',
		    fillOpacity: 0.35,
		    draggable: true,
		    editable: true,
		    geodesic: true
		});

		cropField2.setMap(_map);
		myLatlng = new google.maps.LatLng(36.648, -121.792);
		marker = new google.maps.Marker({
			position: myLatlng,
			map: _map,
			title: 'Current Position'
		});
		marker.setMap(_map);
	    var infoWindow2 = new google.maps.InfoWindow();
		var pname2 = '<div style="color: black;">' + "Field 2<br>" + 
			'date planted: 24 Jan 15<br>' +
			'stock company: MV Seeds<br>' +  
			'lot number: 05ecgi05<br>' +
			'plant type: Lettuce' +'</div>';
		google.maps.event.addListener(marker, 'click', function() {
  			console.log('Vertex moved on outer path.');
	        infoWindow2.setContent(pname2);
        	infoWindow2.open(_map, marker);
		});

		var field3Coords = [
			new google.maps.LatLng(36.6502227, -121.7946188),
			new google.maps.LatLng(36.645, -121.7946188),
			new google.maps.LatLng(36.645, -121.80),
			new google.maps.LatLng(36.6502227, -121.80),
			new google.maps.LatLng(36.6502227, -121.7946188)
		];

  // Construct the polygon.
  		cropField3 = new google.maps.Polygon({
		    paths: field3Coords,
		   	strokeColor: '#0000FF',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: '#0000FF',
		    fillOpacity: 0.35,
		    draggable: true,
		    editable: true,
		    geodesic: true
		});

		cropField3.setMap(_map);

		myLatlng = new google.maps.LatLng(36.648, -121.798);
		marker = new google.maps.Marker({
			position: myLatlng,
			map: _map,
			title: 'Current Position'
		});
		marker.setMap(_map);
	    var infoWindow3 = new google.maps.InfoWindow();
		var pname3 = '<div style="color: black;">' + "Field 3<br>" + 
			'date planted: 24 Jan 15<br>' +
			'stock company: MV Seeds<br>' +  
			'lot number: 08ecbi03<br>' +
			'plant type: Carrots' +'</div>';
		google.maps.event.addListener(marker, 'click', function() {
  			console.log('Vertex moved on outer path.');
	        infoWindow3.setContent(pname3);
        	infoWindow3.open(_map, marker);
		});
		var field4Coords = [
			new google.maps.LatLng(36.6502227, -121.7946188),
			new google.maps.LatLng(36.655, -121.7946188),
			new google.maps.LatLng(36.6551, -121.801),
			new google.maps.LatLng(36.6502227, -121.8),
			new google.maps.LatLng(36.6502227, -121.7946188)
		];

  // Construct the polygon.
  		cropField4 = new google.maps.Polygon({
		    paths: field4Coords,
		   	strokeColor: '#FFFF00',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: '#FFFF00',
		    fillOpacity: 0.35,
		    draggable: true,
		    editable: true,
		    geodesic: true
		});

		cropField4.setMap(_map);

		myLatlng = new google.maps.LatLng(36.652, -121.798);
		marker = new google.maps.Marker({
			position: myLatlng,
			map: _map,
			title: 'Current Position'
		});
		marker.setMap(_map);
	    var infoWindow4 = new google.maps.InfoWindow();
		var pname4 = '<div style="color: black;">' + "Field 4<br>" + 
			'date planted: 24 Jan 15<br>' +
			'stock company: MV Seeds<br>' +  
			'lot number: 06ncai01<br>' +
			'plant type: Cabbage' +'</div>';
		google.maps.event.addListener(marker, 'click', function() {
  			console.log('Vertex moved on outer path.');
	        infoWindow4.setContent(pname4);
        	infoWindow4.open(_map, marker);
		});
		bounds.extend(latlng);
	};

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
		    var content = 'Error: Your browser doesn\'t support geolocation.';
		}
		var options = {
			map: _map,
			position: new google.maps.LatLng(60, 105),content: content
			};

		var infowindow = new google.maps.InfoWindow(options);
		_map.setCenter(options.position);
		document.getElementById("geostat").innerHTML=content;
	};

    //Success callback
	/**
	 *	function to set current latitude and longitude from GPS
	 *	@param p is passed from intel library function
	 */
	var suc = function(p) {
//	    console.log("geolocation success", 4);
	    //Draws the map initially
    	currentLatitude = p.coords.latitude;
    	currentLongitude = p.coords.longitude;
		initialize();
	};
	/**
	 *	fail function for intel gps routine - does nothing 
	 */			    
	var fail = function() {
	    console.log("Geolocation failed. \nPlease enable GPS in Settings.", 1);
		document.getElementById("geostat").innerHTML="Geolocation failed. \nPlease enable GPS in Settings.";
	};



