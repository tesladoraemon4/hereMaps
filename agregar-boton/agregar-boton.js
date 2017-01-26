angular.module('agregarBoton',[])
.component('botonAgregar',{
	templateUrl:'agregar-boton/boton.html',
	controller:function () {
		
		this.rutas=[];
		for (var i=0;i<localStorage.length;i++) {
			var x = localStorage.key(i);
			var y = localStorage.getItem(x);
			this.rutas.push({ruta:x,nombre:y});
		}
		
	}
})



.controller('formRutas', function ($scope,$http) {
	$scope.enviar = function () {//hacemos una peticion http para ver si existe la ruta insertada
		$scope.ruta.bandera;

		$http.get($scope.ruta.real)
		.success(function (data) {
			$scope.ruta.bandera = true;
			localStorage.setItem($scope.ruta.real,$scope.ruta.fic);
			


		})
		.error(function (error) {
			//si no sucedio
			console.log(error);
			$scope.ruta.bandera = false;			
		})


	}
});
