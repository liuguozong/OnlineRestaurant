<template>
<v-app>
  <v-footer app>
  <section style="width: 1000px; height: 300px;">
    <no-ssr>
      <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center" :events="events">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position"
                        :key="index" :vid="index" :events="marker.events"></el-amap-marker>
      </el-amap>
    </no-ssr>
  </section>
  </v-footer>
</v-app>
</template>

<script>
  import * as _ from 'lodash';
export default {
  data() {
    let self = this;
    return {
      zoom:20,
      center: [114.427127, 30.588674],
      events: {
        init(map) {
          let markers = _.cloneDeep(self.markers);
          markers.forEach((item, index) => {
            AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
              item = new SimpleMarker({
                iconLabel: {
                  style: {
                    color: '#fff'
                  }
                },
                map: map,
                position: item.position
              });
            });
          });
        }
      },
      lng: 0,
      lat: 0,
      plugin: [{
        pName: 'Geolocation',
        events: {
          click: (o) => {
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.$nextTick();
              }
            });
          }
        },
        buttonPosition: 'LT'
      }],
      markers: [
        {
          position: [114.427127, 30.588674],
          events: {
            click: () => {
               alert('click marker');
            }
          },
          visible: true,
          clickable: true
        },
      ],
    };
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>

<style lang="scss">
  .map-icon {
    height: 35px;
    width: 35px;
    position: absolute;
    top: 20px;
    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    z-index: 99;
  .icon-state {
    margin-top: 8px;
  }
  }
  .map-enlarge {
    left: 105px;
  }
  .map-border {
    border: 1px solid #b5b9b7;
  }
  .map-range {
    left: 55px;
  }
</style>