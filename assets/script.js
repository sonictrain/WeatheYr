mapboxgl.accessToken = 'pk.eyJ1Ijoic29uaWN0cmFpbiIsImEiOiJjaWpvaXpxaXMwMHdmdW9seGVybXc2NGJtIn0.5B0Jv5pJCNYs9pNdl3tyQA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

let pointer = new mapboxgl.Marker()

function locateMe() {
    navigator.geolocation.getCurrentPosition(success)
};


function success(geoCoord) {
    map = new mapboxgl.Map({
        container: 'map',
        center: [geoCoord.coords.longitude, geoCoord.coords.latitude],
        zoom: 9
    })
    pointer = new mapboxgl.Marker()
        .setLngLat([geoCoord.coords.longitude, geoCoord.coords.latitude])
        .addTo(map);
};

$('#location-btn').on('click', locateMe);