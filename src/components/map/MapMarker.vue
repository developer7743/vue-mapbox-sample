<template>
  <div
    class="map-marker"
    :class="pointTypeClass"
    @click="onMarkerClick"
  />
</template>

<script>
  import MAP_POINT_TYPES from '../../constants/map/mapPointTypes';

  const POINT_TYPE_CLASS = Object.freeze({
    [MAP_POINT_TYPES.GOING_FROM]: 'departure',
    [MAP_POINT_TYPES.VIA]: 'via',
    [MAP_POINT_TYPES.STAY]: 'stay',
    [MAP_POINT_TYPES.GOING_TO]: 'destination',
  });

  export default {
    name: 'MapMarker',
    props: {
      type: {
        type: Number,
        required: true,
        validator(value) {
          return Object.values(MAP_POINT_TYPES).includes(value);
        },
      },
      id: {
        required: true,
      },
    },
    computed: {
      pointTypeClass() {
        return POINT_TYPE_CLASS[this.type];
      },
    },
    methods: {
      onMarkerClick() {
        const marker = {
          id: this.id,
          type: this.type,
        };

        this.$emit('click', marker);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .map-marker {
    width: 40px;
    height: 50px;
    cursor: pointer;
    background-size: cover;
  }

  .departure {
    background-image: url("/images/point-a.svg");
  }

  .via {
    background-image: url("/images/via-point.svg");
  }

  .stay {
    background-image: url("/images/via-point-break.svg");
  }

  .destination {
    background-image: url("/images/point-b.svg");
  }

</style>