export const getPointsCoordinates = (points) => {
  return points.map(point => `${point.lng}, ${point.lat}`).join(';');
};

export const getRouteGeojson = (route) => {
  const coordinates = route.geometry.coordinates;
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };
};

export const createLayer = (id, geojson, options={}) => {
  const { layout, paint } = options;

  return {
    id,
    type: 'line',
    source: {
      type: 'geojson',
      data: geojson
    },
    layout,
    paint,
  };
};