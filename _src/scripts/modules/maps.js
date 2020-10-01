import { Loader, LoaderOptions } from 'google-maps';
import { magnificPopup } from '../libs/magnific';

document.addEventListener('DOMContentLoaded', () => {
  const options = {};
  const loader = new Loader('AIzaSyDoDHFTRtthKKK-Yz61qtlVCeV4VtZFoWc', options);
  const MarkerClusterer = require('@google/markerclusterer');
  const mapContainers = document.querySelectorAll('.googleMap');

  if (mapContainers) {
    loader.load().then(google => {
      function centerMap(map) {
        const bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        map.markers.forEach(marker => {
          const latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
          bounds.extend(latlng);
        });

        if (map.markers.length === 1) {
          map.setCenter(bounds.getCenter());
          map.setZoom(15);
        } else {
          map.fitBounds(bounds);
        }
      }

      function newMap(ele) {
        const markers = document.querySelectorAll('.marker');
        const locations = [];

        const args = {
          zoom: 5,
          center: new google.maps.LatLng(0, 0),
          streetViewControl: false,
          mapTypeControl: false,
          scrollwheel: false,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#bdbdbd'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dadada'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#c9c9c9'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            }
          ]
        };

        markers.forEach(marker => {
          locations.push({
            coordinates: {
              lat: parseFloat(marker.getAttribute('data-lat')),
              lng: parseFloat(marker.getAttribute('data-lng'))
            },
            marker: marker.getAttribute('data-marker'),
            id: marker.getAttribute('data-id')
          });
        });

        // create map
        const map = new google.maps.Map(ele, args);

        // add a markers reference
        map.markers = [];

        // build out map markers
        map.markers = locations.map((location, i) => {
          const completeMarker = new google.maps.Marker({
            position: location.coordinates,
            icon: location.marker,
            id: location.id,
            map
          });
          return completeMarker;
        });

        // open modal with details
        map.markers.forEach(marker => {
          google.maps.event.addListener(marker, 'click', () => {
            if (marker.id) {
              $.magnificPopup.open({
                items: {
                  src: `#${marker.id}`
                },
                type: 'inline',
                removalDelay: 600,
                preloader: false,
                midClick: true,
                closeOnContentClick: false,
                closeBtnInside: true,
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                callbacks: {
                  beforeOpen() {
                    this.st.mainClass = 'mfp-zoom-in';
                  }
                }
              });
            }
          });
        });

        // marker clustering
        const markerCluster = new MarkerClusterer(map, map.markers, {
          imagePath:
            'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m',
          styles: [
            {
              url:
                'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m1.png',
              width: 44,
              height: 43,
              textSize: 14,
              textColor: '#ffffff'
            },
            {
              url:
                'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m2.png',
              width: 54,
              height: 53,
              textSize: 14,
              textColor: '#ffffff'
            },
            {
              url:
                'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m3.png',
              width: 44,
              height: 43,
              textSize: 14,
              textColor: '#ffffff'
            },
            {
              url:
                'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m4.png',
              width: 44,
              height: 43,
              textSize: 14,
              textColor: '#ffffff'
            },
            {
              url:
                'https://vmlyr-projects.s3.us-east-2.amazonaws.com/style-guide-template-site/images/maps/google-map-cluster/m5.png',
              width: 44,
              height: 43,
              textSize: 14,
              textColor: '#ffffff'
            }
          ]
        });

        centerMap(map);

        return map;
      }

      let map;

      mapContainers.forEach(container => {
        map = newMap(container);
      });
    });
  }
});
