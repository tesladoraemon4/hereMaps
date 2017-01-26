'use strict';


angular.module('pagina')
.controller('homeController', function($scope){
	$scope.hola="jsdlhfgsjd";
})
.controller('ControlX', function () {
	
})
.controller('mapita',function ($log) {


	
	//añadimos de informacion a la plataforma
	var platform = new H.service.Platform({
	  'app_id': 'EJiiwcESc8a3fX3YDAhK',
	  'app_code': 'lbdJ16arthEPwrA7nhmluA'
	});




	// Obtain the default map types from the platform object:
	var defaultLayers = platform.createDefaultLayers();

	// Instantiate (and display) a map object:
	var map = new H.Map(
	  document.getElementById('mapContainer'),
	  defaultLayers.satellite.map,
	  {
	    zoom: 10,
	    center: { lat: 52.5, lng: 13.4 }
	  });








	var router = platform.getRoutingService(),
	  routeRequestParams = {
	    mode: 'fastest;car',
	    representation: 'display',
	    routeattributes: 'waypoints,summary,shape,legs',
	    maneuverattributes: 'direction,action',
	    waypoint0: '19.3257086,-99.07784379999998', // Brandenburg Gate
	    waypoint1: '19.3599369,-98.97373779999998'  // Friedrichstraße Railway Station
	  };


	router.calculateRoute(
	  routeRequestParams,
	  function (succes) {
	  	$log.log(succes.response.route[0]);
	  },
	 	function (error) {
	 		$log.log(error);
	 	}
	);

})
.controller('iconosEnElmapa', ['', function(){
	
	//añadimos de informacion a la plataforma
	var platform = new H.service.Platform({
	  'app_id': 'EJiiwcESc8a3fX3YDAhK',
	  'app_code': 'lbdJ16arthEPwrA7nhmluA'
	});




	// Obtain the default map types from the platform object:
	var defaultLayers = platform.createDefaultLayers();

	// Instantiate (and display) a map object:
	var map = new H.Map(
	  document.getElementById('mapContainer'),
	  defaultLayers.satellite.map,
	  {
	    zoom: 10,
	    center: { lat: 52.5, lng: 13.4 }
	  });



	// Define a variable holding SVG mark-up that defines an icon image:
	var svgMarkup = "'<svg width='24' height='24' '" + 
	  "'xmlns='http://www.w3.org/2000/svg'>' "+
	  "'<rect stroke='white' fill='#1b468d' x='1' y='1' width='22' '" + 
	  "'height='22' />' <text x='12' y='18' font-size='12pt' '" + 
	  "'font-family='Arial' font-weight='bold' text-anchor='middle ''" + 
	  "'fill='white'>H</text></svg>'";

	// Create an icon, an object holding the latitude and longitude, and a marker:
	var icon = new H.map.Icon(svgMarkup),
	  coords = {lat: 52.53075, lng: 13.3851},
	  marker = new H.map.Marker(coords, {icon: myIcon});

	// Add the marker to the map and center the map at the location of the marker:
	map.addObject(marker);
	map.setCenter(coords);
}])


.controller('Figuras', function () {

	//añadimos de informacion a la plataforma
	var platform = new H.service.Platform({
	  'app_id': 'EJiiwcESc8a3fX3YDAhK',
	  'app_code': 'lbdJ16arthEPwrA7nhmluA'
	});




	// Obtain the default map types from the platform object:
	var defaultLayers = platform.createDefaultLayers();

	// Instantiate (and display) a map object:
	var map = new H.Map(
	  document.getElementById('mapContainer'),
	  defaultLayers.satellite.map,
	  {
	    zoom: 10,
	    center: { lat: 52.5, lng: 13.4 }
	  });


	//Agregamos la forma


	// Instantiate a circle object (using the default style):
	var circle = new H.map.Circle({lat: 52.51, lng: 13.4}, 8000);

	// Add the circle to the map:
	map.addObject(circle);




	var mapEvents = new H.mapevents.MapEvents(map);

	// Add event listener:
	map.addEventListener('tap', function(evt) {
	  // Log 'tap' and 'mouse' events:
	  console.log(evt.type, evt.currentPointer.type); 
	});



	var behavior = new H.mapevents.Behavior(mapEvents);







})
.controller('primerosmapas', function($scope){

	//añadimos de informacion a la plataforma
	var platform = new H.service.Platform({
	  'app_id': 'EJiiwcESc8a3fX3YDAhK',
	  'app_code': 'lbdJ16arthEPwrA7nhmluA'
	});




	// Obtain the default map types from the platform object:
	var defaultLayers = platform.createDefaultLayers();

	// Instantiate (and display) a map object:
	var map = new H.Map(
	  document.getElementById('mapContainer'),
	  defaultLayers.satellite.map,
	  {
	    zoom: 10,
	    center: { lat: 52.5, lng: 13.4 }
	  });







	//http://[1-4].base.map.api.here.com/maptile/2.1/maptile/newest/normal.day/[z]/[x]/[y]/256/png8?style=fleet
	// Create a MapTileService instance to request base tiles (i.e. 
	// base.map.api.here.com):
	var mapTileService = platform.getMapTileService({ 'type': 'base' });

	// Create a tile layer which requests map tiles with an additional 'style'
	// URL parameter set to 'fleet':
	var fleetStyleLayer = mapTileService.createTileLayer(
	  'maptile', 
	  'normal.day', 
	  256, 
	  'png8', 
	  { 'style': 'fleet' });
	// Set the new fleet style layer as a base layer on the map:
	map.setBaseLayer(fleetStyleLayer);




	//fijamos la vista





	// Enable the event system on the map instance:
	var mapEvents = new H.mapevents.MapEvents(map);

	// Add event listener:
	map.addEventListener('tap', function(evt) {
	  // Log 'tap' and 'mouse' events:
	  console.log(evt.type, evt.currentPointer.type); 
	});



	var behavior = new H.mapevents.Behavior(mapEvents);

	//añadimos las caractersticas al mapa de eventos




});


/*
.controller('serviciosController', function ($scope,$routeParams) {

});

*/