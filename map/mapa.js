/**
* hereMapa Module
*
* Description
*/
angular.module('hereMapa', [])
.factory('mapaProvider',function () {



	var mapaProvider={};

	mapaProvider.instanciarMapa = function (idElement,JSONFeatures,platform) {
		var defaultLayers = platform.createDefaultLayers();
		return new H.Map(//retornamos el mapa
		  document.getElementById(idElement),
		  defaultLayers.satellite.map,
		  JSONFeatures);
	}



	mapaProvider.addEventsMap = function (map,event,eventFunction) {
		var mapEvents = new H.mapevents.MapEvents(map);

		map.addEventListener(event,eventFunction);

		var behavior = new H.mapevents.Behavior(mapEvents);
	}
	mapaProvider.addRoute = function (platform,routeRequestParams,succes,error) {
		var router = platform.getRoutingService(),
		  routeRequestParams;


		router.calculateRoute(
		  routeRequestParams,
		  succes,error
		);
	}





	return mapaProvider;

}
.factory('consultasHttp',function ($http,$q) {
	return {
		getAll:function (searchstexts) {
			var defered = $q.defer();
			dir="https://geocoder.cit.api.here.com/6.2/geocode.xml?"+
			"app_id=EJiiwcESc8a3fX3YDAhK&app_code=lbdJ16arthEPwrA7nhmluA&searchtext='"
			+searchstexts+"'";
			peticiones.push($http({
			  method: 'GET',
			  url: dir,
			  responseType:'text/plain'
			}).then(
				function successCallback(response) {
				console.log(response.status);
				defered.resolve(response);
			}, function errorCallback(response) {
				console.log(response.status);
				defered.reject(response);
			}));


			return defered.promise;
		}
	}
	
})
//servicio para consultar las coordenadas del itinerario echo anterior mente
.factory('queryCoordinates',function ($http,mapaProvider,$log,xmlManager) {
	var queryCoordinates={};
	queryCoordinates.platform = new H.service.Platform({
	  'app_id': 'EJiiwcESc8a3fX3YDAhK',
	  'app_code': 'lbdJ16arthEPwrA7nhmluA'
	});

	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};



	/*
	this.geolocalizarY= function () {

		//si sucede vamos a success
		navigator.geolocation.getCurrentPosition(
		function (pos) {
			var crd = pos.coords;

			//añadimos la ruta
			mapaProvider.addRoute(platform,
			{
			    mode: 'fastest;car',
			    representation: 'display',
			    routeattributes: 'waypoints,summary,shape,legs',
			    maneuverattributes: 'direction,action',
			    waypoint0: crd.latitude+","+crd.longitude, // Brandenburg Gate
			    waypoint1:  // Friedrichstraße Railway Station
			});


			console.log("Se realizo bien la geolocalizacion");
		}, error, options);
	}
	*/

	//contiene las coordenadas de lugares en un arreglo de string
	queryCoordinates.getCordenadasLugares = function () {
		//hacer consulta y regresar array de strings del server
		var searchstexts = ['Mexico DF','ricardo flores magon'];
		var dir, coordenadas=[], peticiones=[];

		for (var i=0; i<searchstexts.length;i++) {

		}



		return peticiones;
	}









	return queryCoordinates;
})
.component('mapaHere',{
	templateUrl:'map/mapa.html',
	controller:function (mapaProvider,queryCoordinates,$log) {
		//PREPARAMOS EL MAPA 
		var platform = new H.service.Platform({
		  'app_id': 'EJiiwcESc8a3fX3YDAhK',
		  'app_code': 'lbdJ16arthEPwrA7nhmluA'
		});
		var mapa = mapaProvider.instanciarMapa(
			'mapContainer',
			{
				zoom: 10,
				center: { lat: 52.5, lng: 13.4 }
			},
			platform
			);


		//BUSCAMOS LAS CORDENADAS

		var peticiones = queryCoordinates.getCordenadasLugares();

		console.log(peticiones[0].data);






		//AÑADIMOS EL EVENTO AL MAPA
		mapaProvider.addEventsMap(mapa,'tap',function (evt) {
			console.log(evt.type, evt.currentPointer.type); 
		});

	}
})
;
