odoo.define("leaflet.map.options", function (require) {
  "use strict";

  var core = require("web.core");
  var options = require("web_editor.snippets.options");

  var _t = core._t;
  var qweb = core.qweb;

  options.registry.leafletmap = options.Class.extend({
    xmlDependencies: ["/leafletjs/static/src/xml/leaflet.map.xml"],
    start: function () {
      var self = this;
      this.map_params = {
        center: [51.505, -0.09],
        zoom: 13,
        closePopupOnClick: true,
        boxZoom: true,
        draggin: true,
      };
      this.$target.on("click", ".s_leaftlet_add_map", function (e) {
        console.log("I'm in start");
        e.stopImmediatePropagation();
        self.createMap();
      });
    },
    onBuilt: function () {
      console.log("I'm in build");
      this.id = "leaflet-map-container-" + new Date().getTime();
      this.$target.attr("id", this.id);
    },
    createMap: function () {
      this.map_id = this.id + "-map";
      var map = $(qweb.render("leaflet.map", { id: this.map_id }));
      var container = this.$target.find(".container:first");
      container.empty().append(map);
      /*this.map = L.map(this.map_id, this.map_params);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.map.attributionControl.setPosition('topright');*/
    },
  });
});
