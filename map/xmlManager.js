angular.module('hereMapa')
.factory('xmlManager', function(){
	var xmlManager ={};
	xmlManager.getValuesElement= function (tag,xml) {//buscamos el elemento
		var pos =xml.indexOf(tag)+(tag.length)+1;
		return xml.substring(pos,xml.indexOf("<",pos));
	}

	return xmlManager;

});