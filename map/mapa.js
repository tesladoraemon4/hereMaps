/**
* hereMapa Module
*
* Description
*/
angular.module('hereMapa', [])
.service('mapaProvider',function () {

	this.instanciarMapa = function (idElement,JSONFeatures,platform) {
		var defaultLayers = platform.createDefaultLayers();
		return new H.Map(//retornamos el mapa
		  document.getElementById(idElement),
		  defaultLayers.satellite.map,
		  JSONFeatures);
	}



	this.addEventsMap = function (map,event,eventFunction) {
		var mapEvents = new H.mapevents.MapEvents(map);

		map.addEventListener(event,eventFunction);

		var behavior = new H.mapevents.Behavior(mapEvents);
	}







//no sirve
	this.addRoute = function (platform) {
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
	}

	return mapaProvider;

})
//servicio para consultar las coordenadas del itinerario echo anterior mente
.service('queryCoordinates',function ($http) {


	//genera el itinerario y consulta los lugares guardados en el mismo
	this.getRoutesGood = function () {
		//hacer consulta y regresar array de strings del server
		var searchstexts = ['Mexico DF','ricardo flores magon ','ecatepec'];
		var dir;


		for (var i = searchstexts.length - 1; i >= 0; i--) {
			dir="https://geocoder.cit.api.here.com/6.2/geocode.xml?"+
			"app_id=EJiiwcESc8a3fX3YDAhK&app_code=lbdJ16arthEPwrA7nhmluA&searchtext="
			+searchstexts[i];
			$http.get(dir)//obtenemos todo del texto de busqueda
			.success(function (data) {


			}).error(function (error) {
				console.log(error);
			});
		}






		return [{obj}];
	}









	return queryCoordinates;
})
.component('mapaHere',{
	templateUrl:'map/mapa.html',
	controller:function (mapaProvider) {

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

		mapaProvider.addEventsMap(mapa,'tap',function (evt) {
			console.log(evt.type, evt.currentPointer.type); 
		});

	}
})
;
