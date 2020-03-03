<template>
  <div class="map" />
</template>

<script>
  import { mapActions } from 'vuex';
  import mapBoxGL from 'mapbox-gl/dist/mapbox-gl';
  import {
    getPointsCoordinates,
    getRouteGeojson,
    createLayer,
  } from '../../utils/map/mapPoints';

  const DEFAULT_MAP_OPTIONS = {
    style: 'mapbox://styles/mapbox/streets-v9',
  };

  const MAP_ROUTE_LAYER_PREFIX = 'route-';

  export default {
    name: 'Map',
    props: {
      accessToken: {
        type: String,
        required: true,
      },
      map: {
        type: Object,
        default: null,
      },
      mapOptions: {
        type: Object,
        default: () => {},
      },
      markers: {
        type: Array,
        default: () => [],
      },
      routes: {
        type: Array,
        default: () => [],
      },
      routeOptionsMap: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.initMap();
      this.initMarkers();
    },
    data() {
      return {
        addedMarkers: [],
        routeLayers: [],
      };
    },
    methods: {
      ...mapActions({
        requestRoute: 'map/requestRoute',
      }),
      initMap() {
        mapBoxGL.accessToken = this.accessToken;
        const map = new mapBoxGL.Map({
          ...DEFAULT_MAP_OPTIONS,
          ...this.mapOptions,
          container: this.$el,
        });

        map.on('click', (event) => {
          this.$emit('click', event);
        });

        this.$emit('map-init', map);
      },
      initMarkers() {
        if (!Array.isArray(this.markers) || !this.markers.length) {
          return;
        }

        this.updateMarkers(this.markers);
      },
      addMarker({ lng, lat, options={} }) {
        if (!this.map) {
          return;
        }

        const coordinates = [lng, lat];
        return new mapBoxGL.Marker(options)
          .setLngLat(coordinates)
          .addTo(this.map);
      },
      updateMarkers(markers) {
        if (!Array.isArray(markers)) {
          return;
        }

        this.addedMarkers = markers.map((marker) => {
          return this.addMarker(marker);
        });
      },
      removeMarkers() {
        this.addedMarkers.forEach((marker) => {
          marker.remove();
        });

        this.addedMarkers = [];
      },
      updateRoute() {
        if (!this.markers || this.markers.length < 2) {
          this.clearRoutesLayers();
          return;
        }

        const coordinatesString = getPointsCoordinates(this.markers);
        this.requestRoute(coordinatesString);
      },
      addLayerId(layerId) {
        this.routeLayers = this.routeLayers.concat(layerId);
      },
      setRoutesLayers(routes=[]) {
        if (!this.map || !Array.isArray(routes)) {
          return;
        }

        routes.forEach((route, index) => {
          const geojson = getRouteGeojson(route);
          const layerId = `${MAP_ROUTE_LAYER_PREFIX}${index}`;
          const options = this.routeOptionsMap[index];

          const layer = createLayer(layerId, geojson, options);

          this.map.addLayer(layer);
          this.addLayerId(layerId);
        });
      },
      clearRoutesLayers() {
        if (!this.map) {
          return;
        }

        this.routeLayers.forEach((layerId) => {
          this.map.removeLayer(layerId);
          this.map.removeSource(layerId);
        });
        this.routeLayers = [];
      },
    },
    watch: {
      markers(value) {
        this.removeMarkers();
        this.updateMarkers(value);
        this.updateRoute();
      },
      routes(value) {
        this.clearRoutesLayers();
        this.setRoutesLayers(value);
      },
    },
  }
</script>