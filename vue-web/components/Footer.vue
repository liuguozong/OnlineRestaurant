<template>
  <v-footer style="background-color:white;" class="d-flex flex-column align-stretch">
    <section style="height: 300px;">
      <no-ssr>
        <el-amap
          vid="amap"
          :zoom="zoom"
          :plugin="plugin"
          class="amap-demo"
          :center="center"
          :events="events"
        >
          <el-amap-marker
            v-for="(marker, index) in markers"
            :position="marker.position"
            :key="index"
            :vid="index"
            :events="marker.events"
          ></el-amap-marker>
        </el-amap>
      </no-ssr>
    </section>
    <v-row class="d-flex flex-wrap flex-row align-center justify-center offset-2 ">
      <v-col class="col-md-3 col-12 d-flex justify-md-center justify-start">
        <v-btn
          v-ripple="{ center: true, class: 'blue--text text--lighten-3 ' }"
          color="black"
          text
          icon
          href="https://github.com/liuguozong"
        >
          <v-icon dark>mdi-github</v-icon>
        </v-btn>

        <v-btn
          v-ripple="{ center: true, class: 'blue--text text--lighten-3 ' }"
          color="black"
          text
          icon
          href="https://github.com/liuguozong/OnlineRestaurant"
        >
          <v-icon dark>
            mdi-file-code-outline
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="col-md-6 col-12">
        Copyright © 2020 OnlineRestaurant
        <div style="font-size:15px;color:grey">
          毕业设计作品
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: '',

  components: {},
  props: [],
  data() {
    let self = this
    return {
      zoom: 20,
      center: [114.427127, 30.588674],
      events: {
        init(map) {
          let markers = _.cloneDeep(self.markers)
          markers.forEach((item, index) => {
            AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
              item = new SimpleMarker({
                iconLabel: {
                  style: {
                    color: '#fff'
                  }
                },
                map: map,
                position: item.position
              })
            })
          })
        }
      },
      lng: 0,
      lat: 0,
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            click: (o) => {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.$nextTick()
                }
              })
            }
          },
          buttonPosition: 'LT'
        }
      ],
      markers: [
        {
          position: [114.427127, 30.588674],
          events: {
            click: () => {
              alert('click marker')
            }
          },
          visible: true,
          clickable: true
        }
      ]
    }
  },

  computed: {},

  watch: {},

  methods: {}
}
</script>
<style lang="scss" scoped>
footer {
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
  &:hover {
    @include card-hover-boxshadow;
  }
}
.search-container {
  width: 100vw;
  height: 500px;
  margin-bottom: 100px;
  @media screen and (max-width: 1900px) {
    height: 400px;
  }
  @media screen and (max-width: 960px) {
    height: 300px;
    margin-bottom: 0px;
  }
  @media screen and (max-width: 600px) {
    height: 200px;
    margin-bottom: 0px;
  }
  padding: 0;
  background-image: url('/imgs/search-bg.jpg');
  background-size: contain;
}
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
