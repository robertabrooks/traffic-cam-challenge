
"use strict";


$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var markers = [];
    var light;
    var image = 'camera.png';

    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();


    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            light = data;

            data.forEach(function(light) {
                var marker = {
                    mark: new google.maps.Marker({
                        position: {
                            lat: Number(light.location.latitude),
                            lng: Number(light.location.longitude)
                        },
                        icon: image,
                        map: map
                    }),
                    name: light.cameralabel
                };
                markers.push(marker);

                google.maps.event.addListener(marker.mark, 'click', function() {
                    var html = '<h2>' + light.cameralabel + '</h2>';
                    html += '<img src="' + light.imageurl.url + '"/>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                    map.panTo(marker.mark.getPosition());
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.close();
                });
            });
        })
        .fail(function(error) {
            window.alert(error);
        })
        .always(function() {
           // $('#ajax-loader').fadeOut();
        });
});