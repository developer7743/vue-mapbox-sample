<template>
  <div class="map-preview">
    <div class="text-center h3 my-4">
      Map preview
    </div>
    <div class="my-3">
      This is interactive map component (powered by mapbox)
      <p>
        MapBox options api reference: https://docs.mapbox.com/mapbox-gl-js/api/
      </p>
      <p>
        Markers is a list of objects of the shape:
      </p>
      <pre>
        {
          lng: 123,
          lat: 123,
          options: {
            //MapBox Marker api reference: https://docs.mapbox.com/mapbox-gl-js/api/#marker
          }
        }
      </pre>
      <p>
        MapBox api layers line reference: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
        RouteOptionsMap is a map of route indexes and layer options. It's an object of the shape:
      </p>
      <pre>
        {
          0: {
            layout: { ... },
            point: { ... }
          }
        }
      </pre>
    </div>
    <div v-if="hasMapToken" class="map-container">
      <Map
        :access-token="getMapToken"
        :map="getMap"
        :markers="getMarkers"
        :routes="getRoutes"
        :routeOptionsMap="routeOptionsMap"
        @map-init="onMapInit"
        @click="onMapClick"
      />
      <MapContextMenu
        :visible="isContextOpen"
        :position="contextPosition"
        :mode="contextMenuMode"
        :marker-type="clickedMarkerType"
        @click="onContextMenuClick"
      />
    </div>
    <div v-else class="text-center font-weight-bold">
      Mapbox token is required
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapMutations } from 'vuex';
  import Map from './Map';
  import MapContextMenu from './MapContextMenu';
  import MapMarker from './MapMarker';
  import ROUTE_OPTIONS_MAP from '../../constants/map/routeOptionsMap';
  import MAP_CONTEXT_MODES from '../../constants/map/contextMenuModeTypes';
  import MAP_POINT_TYPES from '../../constants/map/mapPointTypes';

  const isValidPointType = (type) => {
    return Object.values(MAP_POINT_TYPES).includes(type);
  };

  export default {
    name: 'MapPreview',
    components: {
      Map,
      MapContextMenu,
    },
    data() {
      return {
        isContextOpen: false,
        contextPosition: null,
        clickPointLngLat: null,
        clickedMarkerType: null,
        clickedMarkerId: null,
        routeOptionsMap: ROUTE_OPTIONS_MAP,
      };
    },
    computed: {
      ...mapGetters({
        getRoutes: 'map/getRoutes',
        getMap: 'map/getMap',
        getMapToken: 'map/getMapToken',
        getMarkers: 'map/getMarkers',
        getMarkerId: 'map/getMarkerId',
      }),
      contextMenuMode() {
        return this.clickedMarkerType === null ? MAP_CONTEXT_MODES.MAP : MAP_CONTEXT_MODES.POINT;
      },
      hasMapToken() {
        return Boolean(this.getMapToken);
      },
    },
    methods: {
      ...mapMutations({
        setMap: 'map/setMap',
        addMarker: 'map/addMarker',
        updateMarker: 'map/updateMarker',
        deleteMarker: 'map/deleteMarker',
        nextMarkerId: 'map/nextMarkerId',
      }),
      onMapInit(map) {
        this.setMap(map);
      },
      onMapClick(e) {
        if (this.isContextOpen) {
          this.resetContextMenu();
          return;
        }

        this.contextPosition = e.point;
        this.clickPointLngLat = e.lngLat;
        this.isContextOpen = true;
      },
      resetContextMenu() {
        this.isContextOpen = false;
        this.contextPosition = null;
        this.clickPointLngLat = null;
        this.clickedMarkerType = null;
        this.clickedMarkerId = null;
      },
      onContextMenuClick(type) {
        if (!this.clickPointLngLat) {
          return;
        }

        if (this.contextMenuMode === MAP_CONTEXT_MODES.MAP) {
          this.onAddMarker(type);
        } else if (this.contextMenuMode === MAP_CONTEXT_MODES.POINT) {
          this.onPointContextMenuClick(type);
        }

        this.resetContextMenu();
      },
      onPointContextMenuClick(type) {
        if (!isValidPointType(type)) {
          this.deleteMarker(this.clickedMarkerId);
        }

        this.onUpdateMarker(type);
      },
      createMarker(id, type, lngLat = this.clickPointLngLat) {
        const Marker = Vue.extend(MapMarker);
        const props = {
          propsData: {
            id,
            type,
          },
        };
        const marker = new Marker(props).$mount();
        marker.$on('click', this.markerClick);

        return {
          id,
          type,
          ...lngLat,
          options: { element: marker.$el },
        };
      },
      onAddMarker(type) {
        this.nextMarkerId();
        const marker = this.createMarker(this.getMarkerId, type);
        this.addMarker(marker);
      },
      markerClick(marker = {}) {
        const { id, type } = marker;
        this.clickedMarkerType = type;
        this.clickedMarkerId = id;
      },
      onUpdateMarker(type) {
        if (this.clickedMarkerId === null) {
          return;
        }

        const prevMarker = this.getMarkers.find((marker) => marker.id === this.clickedMarkerId);

        if (!prevMarker) {
           return;
        }

        const lngLat = {
          lng: prevMarker.lng,
          lat: prevMarker.lat,
        };

        const marker = this.createMarker(prevMarker.id, type, lngLat);
        this.updateMarker(marker);
      },
    },
  };
</script>

<style scoped>
  .map-container {
    position: relative;
  }

  .map {
    min-height: 500px;
  }
</style>