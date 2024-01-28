mapboxgl.accessToken = 'pk.eyJ1Ijoic29uaWN0cmFpbiIsImEiOiJjaWpvaXpxaXMwMHdmdW9seGVybXc2NGJtIn0.5B0Jv5pJCNYs9pNdl3tyQA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

let pointer = new mapboxgl.Marker()

function locateMe() {
    handleSpinner();
    navigator.geolocation.getCurrentPosition(success)
};


function success(geoCoord) {
    map.flyTo({
        center: [geoCoord.coords.longitude, geoCoord.coords.latitude],
        zoom: 9,
        essential: true
        });
    if (pointer) {
        pointer.remove();
    }
    pointer = new mapboxgl.Marker()
        .setLngLat([geoCoord.coords.longitude, geoCoord.coords.latitude])
        .setDraggable(true)
        .addTo(map)
        .on('dragend', () => {
            const LngLat = pointer.getLngLat()
            map.flyTo({
                center: [LngLat.lng, LngLat.lat],
                zoom: 9,
                essential: true
                });
        });

    handleSpinner();
};

$('#location-btn').on('click', locateMe);

function handleSpinner() {
    if ($('#spinner').attr('status') === 'idle') {

        $('#location-icon').addClass('opacity-0')

        setTimeout(function(){
            $('#location-icon').addClass('d-none');
            $('#spinner').removeClass('d-none');
        },500)

        $('#spinner').removeClass('opacity-0');

        setTimeout(function(){
            $('#spinner').addClass('opacity-100');
        },500)

        $('#spinner').attr('status', 'active')

    } else if ($('#spinner').attr('status') === 'active') {

        $('#spinner').removeClass('opacity-100');
        $('#spinner').addClass('opacity-0')

        setTimeout(function(){
            $('#spinner').addClass('d-none');
            $('#location-icon').removeClass('d-none');
            $('#spinner').attr('status', 'idle')
        },500)

        $('#location-icon').removeClass('opacity-0');

        setTimeout(function(){
            $('#location-icon').addClass('opacity-100');
        },500)
    };
};