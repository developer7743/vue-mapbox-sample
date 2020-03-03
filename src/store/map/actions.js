import MapboxService from '../../services/MapboxService';

export const requestRoute = ({ commit, getters }, coordinatesString) => {
    const token = getters.getMapToken;
    return MapboxService.requestRoute(coordinatesString, token)
        .then(data => {
            commit('setRoutes', data.routes);
        });
};