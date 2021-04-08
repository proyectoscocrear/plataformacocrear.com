// L.marker([51.505, -0.09]).bindTooltip('<div> hello!!! </div>')
// var map = L.getMapById('leaflet-map-container-1612927331484-map')
//todo pagina de aliados:
// * La categoria se debe de configurar en una opcion global.
// * Se deben tener campos nuevos para una categorizacion mas completa
odoo.define("leaflet.map.animation", function (require) {
  "use strict";
  var publicWidget = require("web.public.widget");
  /**
   * Provides a way to start JS code for snippets' initialization and animations.
   */

  publicWidget.registry.leafletmap = publicWidget.Widget.extend({
    selector: ".s_leaflet_map",
    start: function () {
      this.tileLayerList = [];
      this.map_params = {
        center: [51.505, -0.09],
        zoom: 13,
        closePopupOnClick: true,
        boxZoom: true,
        draggin: true,
        preferCanvas: true,
      };
      this._getMap();
      this._setMainTileLayer(
        //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        /**
         * Hybrid: s,h;
         * Satellite: s;
         * Streets: m;
         * Terrain: p;
         */
        "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );
    },
    _getMap: function () {
      var map = this.$target.find(".container:first > div");
      this.map_id = map.attr("id");
      this.id = this.map_id;
      this.map = L.map(this.map_id, this.map_params);
      this.map.odoosnippet = this;
    },
    _setMainTileLayer: function (url, options) {
      this.mainTile = L.tileLayer(url, options);
      this.mainTile.addTo(this.map);
    },
    setTileLayer: function (url, options) {
      this.tileLayerList.push(L.tileLayer(url, options));
      this.tileLayerList[this.tileLayerList.length - 1].addTo(this.map);
    },
  });
});
