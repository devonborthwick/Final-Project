var map = L.map('map').setView([28.171474796331385, -5.573359712115406], 2.5);
var usgs = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 20,
				attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'})		
				.addTo(map);
                
				var geoJSONVolc = "volcanoes.geojson";
				var geoJSONTsu = "tsunami.geojson";
				var geoJSONQuake = "earthquake.geojson";
				var geoJSONTectonic = "tectonic.geojson";
				var geoJSONflood = "floods.geojson";        



    /// ICONS

	var volcanoIcon = {
		iconUrl: 'marker.png',
		iconSize: [15,15]
	};
	var customIcon = L.icon(volcanoIcon);
	var markerOptions = {
		icon: customIcon,
		title: "Volcano Location"
	};


	var tsunamiIcon = {
		iconUrl: 'tsunami.png',
		iconSize: [15,15]
	};
	var customIcon1 = L.icon(tsunamiIcon);
	var markerOptions1 = {
		icon: customIcon1,
		title: "Tsunami Location"
	};

	var quakeIcon = {
		iconUrl: 'earthquake.png',
		iconSize: [15,15]
	};
	var customIcon2 = L.icon(quakeIcon);
	var markerOptions2 = {
		icon: customIcon2,
		title: "Earthquake Location"
	};

	var floodIcon = {
		iconUrl: 'flood.png',
		iconSize: [12,12]
	};
	var customIcon3 = L.icon(floodIcon);
	var markerOptions3 = {
		icon: customIcon3,
		title: "Flood Location"
	};


	function getMarkerSize(zoomLevel) {
		if (zoomLevel <= 2.5) return [12, 12];   
		else if (zoomLevel <= 5) return [15, 15]; 
		else if (zoomLevel <= 7) return [18, 18];
		else return [20, 20];  
	}

	/// Volcanoes

	var volcanoes = L.geoJSON(null, {
			onEachFeature: forEachFeature1, 
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, markerOptions);
			}
	  }); 

	function forEachFeature1(feature, layer) {
	
	var popupContentVolc = "<p>Volcano: " +
		feature.properties.Name + "</br>" + "Location: " + feature.properties.Location + "</br>" +"Coordinates: " + feature.geometry.coordinates + "</br>" + "Eruption Date: " + feature.properties.Mo + "/" + feature.properties.Dy + "/" + feature.properties.Year + "</br>" +
		"VEI: " + feature.properties.VEI + "</br>" + "Volcano Type: " + feature.properties.Type + "</br>" + "Deaths: " + feature.properties.Deaths;
		
		layer.bindPopup(popupContentVolc)}


 
        $.getJSON(geoJSONVolc, function(data) {
			if (data.features && data.features.length > 0) {
        volcanoes.addData(data);
    } 
			
		});
	
	
	volcanoes.addTo(map);


//Tsunamis


	var tsunami = L.geoJSON(null, {
			onEachFeature: forEachFeature2, 
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, markerOptions1)
			}
				}); 
             
               

	function forEachFeature2(feature, layer) {
	
	var popupContentTsu =  "Location: " + feature.properties.Location + "</br>" +"Coordinates: " + feature.geometry.coordinates + "</br>" + "Tsunami Date: " + feature.properties.Mo + "/" + feature.properties.Dy + "/" + feature.properties.Year + "</br>" +
		"Intensity: " + feature.properties.Intensity + "</br>" + "Maximum Tsunami Height (m): " + feature.properties.Height + "</br>" + "Deaths: " + feature.properties.Deaths;
		
				layer.bindPopup(popupContentTsu)};

        $.getJSON(geoJSONTsu, function(data) {
			if (data.features && data.features.length > 0) {
        tsunami.addData(data);
    }});
	
	
	tsunami.addTo(map);

	//Earthquakes

	var quake = L.geoJSON(null, {
			onEachFeature: forEachFeature3, 
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, markerOptions2)
			}
				}); 
              

	function forEachFeature3(feature, layer) {
	
	var popupContentQuake =  "Location: " + feature.properties.Location + "</br>" +"Coordinates: " + feature.geometry.coordinates + "</br>" + "Earthquake Date: " + feature.properties.Mo + "/" + feature.properties.Dy + "/" + feature.properties.Year + "</br>" +
		"Magnitude: " + feature.properties.Mag + "</br>" + "Focal Depth (km): " + feature.properties.Depth + "</br>" + "Deaths: " + feature.properties.Deaths;
		
				layer.bindPopup(popupContentQuake)};

        $.getJSON(geoJSONQuake, function(data) {
			if (data.features && data.features.length > 0) {
        quake.addData(data);
    }});
	
	
	quake.addTo(map);

	/// Floods

	var flood = L.geoJSON(null, {
			onEachFeature: forEachFeature4, 
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, markerOptions3)
			}
				}); 

               

	function forEachFeature4(feature, layer) {
	
	var popupContentFlood=  "Location: " + feature.properties.Location + "</br>" +"Coordinates: " + feature.geometry.coordinates + "</br>" + "Date Started: " + feature.properties.Began + "</br>" + "Date Ended: " + feature.properties.Ended + "</br>" +
		"Cause: " + feature.properties.MainCause + "</br>" + "People Displaced: " + feature.properties.Displaced + "</br>" + "Deaths: " + feature.properties.Dead;
		
				layer.bindPopup(popupContentFlood)};

        $.getJSON(geoJSONflood, function(data) {
			if (data.features && data.features.length > 0) {
        flood.addData(data);
    }});
	
	
	flood.addTo(map);
	
/// Zoom


map.on('zoomend', function() {
	var currentZoom = map.getZoom();

volcanoes.eachLayer(function(layer) {
	var newSize = getMarkerSize(currentZoom);
	var currentIcon = layer.options.icon;
	currentIcon.options.iconSize = newSize;  // Update icon size
	layer.setIcon(currentIcon);  // Apply the new icon
});

tsunami.eachLayer(function(layer) {
	var newSize = getMarkerSize(currentZoom);
	var currentIcon = layer.options.icon;
	currentIcon.options.iconSize = newSize;  // Update icon size
	layer.setIcon(currentIcon);  // Apply the new icon
});
quake.eachLayer(function(layer) {
	var newSize = getMarkerSize(currentZoom);
	var currentIcon = layer.options.icon;
	currentIcon.options.iconSize = newSize;  // Update icon size
	layer.setIcon(currentIcon);  // Apply the new icon
});
flood.eachLayer(function(layer) {
	var newSize = getMarkerSize(currentZoom);
	var currentIcon = layer.options.icon;
	currentIcon.options.iconSize = newSize;  // Update icon size
	layer.setIcon(currentIcon);  // Apply the new icon
});
});
	/// Plates

/// Improve speed
// $.getJSON(geoJSONTectonic,function(data){
	
// 	var plates = L.geoJson(data ,{
// 	onEachFeature: function(feature, featureLayer) {
// 	featureLayer.bindPopup("Bourdary Type: " + feature.properties.Boundary_Type);
// 	}
// 	}).addTo(map);
// 	});



/// Toggle 

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});


	var baseMaps = {
			"Esri World Imagery": esri,
			"USGS Imagery": usgs,
			"Esri World Topo": topo
		};

		var overlayMaps = {
			"Volcanoes": volcanoes,
			"Tsunamis": tsunami,
			"Earthquakes": quake,
            "Floods": flood,
			

		};
		
	var layerControl =	L.control.layers(baseMaps, overlayMaps)
	layerControl.addTo(map);


/// Scale
	L.control.scale({
		metric: true,
		imperial: true,
		maxWidth: 100,
		position: "bottomleft"
	}).addTo(map);

	var options = {
		position: "topright",
		lengthUnit: {
			label: "Distance:",
			display: "km",
			decimal: 2
		}
	};

    // Legend

	var legend = L.control({ position: "bottomleft" });

	legend.onAdd = function(map) {
	  var div = L.DomUtil.create("div", "legend");
	  div.innerHTML += "<h4>Legend</h4>";
	  div.innerHTML += '<i class="icon" style="background-image: url(marker.png);background-repeat: no-repeat;"></i><span>Volcanoes</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(tsunami.png);background-repeat: no-repeat;"></i><span>Tsunamis</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(earthquake.png);background-repeat: no-repeat;"></i><span>Earthquakes</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(flood.png);background-repeat: no-repeat;"></i><span>Floods</span><br>';
	//   div.innerHTML += '<i class="icon" style="background-image: url(line.png);background-repeat: no-repeat;"></i><span>Tectonic Plate Boundaries</span><br>';
	
	  return div;
	};
	
	legend.addTo(map);

	///Search
	var poiLayers = L.layerGroup([
		quake,
		tsunami,
		volcanoes,
		flood
	])
	.addTo(map);
	
	L.control.search({
		layer: poiLayers,
		propertyName: "Location",
		textPlaceholder: 'Location Search',
		buildTip: function(text, val) {
			var type = val.layer.feature.properties.Hazard;
			return '<a href="#" class="'+type+'">'+text+'<b> - '+type+'</b></a>';
		}
	})
	.addTo(map);
