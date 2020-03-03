import MAP_POINT_TYPES from '../../constants/map/mapPointTypes';

const MIDDLE_POINT_TYPES = [MAP_POINT_TYPES.VIA, MAP_POINT_TYPES.STAY];

export const addMarker = (markers, marker) => {
  if (MIDDLE_POINT_TYPES.includes(marker.type)) {
    return addMiddlePoint(markers, marker);
  }

  const newMarkers = markers.filter(m => m.type !== marker.type);
  switch (marker.type) {
    case MAP_POINT_TYPES.GOING_FROM:
      newMarkers.unshift(marker);
      break;
    case MAP_POINT_TYPES.GOING_TO:
      newMarkers.push(marker);
      break;
  }

  return newMarkers;
};

export const updateMarkers = (markers, marker) => {
  switch (marker.type) {
    case MAP_POINT_TYPES.GOING_FROM:
    case MAP_POINT_TYPES.GOING_TO:
      return markers.reduce((arr, m) => {
        if (m.type === marker.type) {
          return arr.concat(marker);
        }

        if (m.id === marker.id) {
          return arr;
        }

        return arr.concat(m);
      }, []);
    case MAP_POINT_TYPES.VIA:
    case MAP_POINT_TYPES.STAY:
      return markers.map(m => m.id === marker.id ? marker : m);
  }
};

const addMiddlePoint = (markers, marker) => {
  if (!markers.length) {
    return [marker];
  }

  const lastMarker = markers[markers.length - 1];
  if (lastMarker.type === MAP_POINT_TYPES.GOING_TO) {
    return markers.slice(0, -1).concat(marker, lastMarker);
  }

  return markers.concat(marker);
};