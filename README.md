# Vue-mapbox-sample

Vue-mapbox-sample it`s interactive map component (powered by mapbox). You can get a detailed route from several points.

Markers is a list of objects of the shape:

      {
        lng: 123,
        lat: 123,
        options: {
          //MapBox Marker api reference: https://docs.mapbox.com/mapbox-gl-js/api/#marker
        }
      }

MapBox api layers line reference: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line RouteOptionsMap is a map of route indexes and layer options. It's an object of the shape:

      {
        0: {
          layout: { ... },
          point: { ... }
        }
      }


## Setup
Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

Add mapbox token to the .env file.

```
VUE_APP_MAPBOX_ACCESS_TOKEN= YOUR_MAPBOX_TOKEN
VUE_APP_MAPBOX_USERNAME= YOUR_MAPBOX_USERNAME
```
Install all the dependencies
```bash
yarn install
```

Run project
```bash
yarn serve
```

