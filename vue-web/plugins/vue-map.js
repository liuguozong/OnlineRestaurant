import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
if (!Vue.prototype.$isServer) {
  VueAMap.initAMapApiLoader({
    key: '4a5f7fe3a253f5547f8f3aba94cfdf1c',
    plugin: ['AMap.Geolocation', 'AMap.Marker', 'AMap.ToolBar', 'AMap.Circle', 'AMap.PolyLine'],
    uiVersion: '1.0',
    v: '1.4.8'
  })
}
