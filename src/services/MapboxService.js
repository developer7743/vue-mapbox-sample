import axios from 'axios';

const apiUrl = 'https://api.mapbox.com/directions/v5/mapbox';

const MapboxService = {
  requestRoute(coordinatesString, token) {
    let url = `${apiUrl}/driving/${coordinatesString}`;
    let requestParams = {
      steps: true,
      alternatives: true,
      geometries: 'geojson',
      access_token: token,
    };

    return axios.get(url, { params: requestParams })
      .then(response => response.data);
  }
};

export default MapboxService;