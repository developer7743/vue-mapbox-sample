import {
  addMarker as addMarkerHelper,
  updateMarkers,
} from '../../utils/map/markersHelper.js';

export const setRoutes = (state, routes) => {
  state.routes = routes;
};

export const setMap = (state, map) => {
  state.map = map;
};

export const setMarkers = (state, markers) => {
  state.markers = markers;
};

export const addMarker = (state, marker) => {
  if (!marker.id) {
    marker.id = state.markerIdCursor++;
  }

  state.markers = addMarkerHelper(state.markers, marker);
};

export const updateMarker = (state, marker) => {
  state.markers = updateMarkers(state.markers, marker);
};

export const deleteMarker = (state, id) => {
  state.markers = state.markers.filter(marker => marker.id !== id);
};

export const nextMarkerId = (state) => {
  state.markerIdCursor += 1;
};