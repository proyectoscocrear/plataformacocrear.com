odoo.define("website_aliados.animation", function (require) {
  "use strict";

  var core = require("web.core");
  var publicWidget = require("web.public.widget");

  var qweb = core.qweb;

  publicWidget.registry.aliados = publicWidget.Widget.extend({
    selector: ".i_aliados_map_filters",
    xmlDependencies: ["/website_aliados/static/src/xml/website.aliados.xml"],
    disabledInEditableMode: false,
    events: {
      //     "mouseenter .wrap-row": "_onEnterRow",
      //   "mouseleave .wrap-row": "_onLeaveRow",
      "click #js_filter_search_button": "_onChangeFilter",
    },

    /**
     * @override
     */
    start: function () {
      var self = this;
      this.select_aliado_id = this.$("#js_aliado_id");
      this.select_aliado_category_id = this.$("#js_aliado_category_id");
      this.select_aliado_city_id = this.$("#js_aliado_city_id");
      this.markers = [];
      this.markers_in_map = [];
      this.select_aliado_id.select2();
      this.select_aliado_category_id.select2();
      this.select_aliado_city_id.select2();
      this.aliados_map = L.getMapById(
        "leaflet-map-container-aliados-map"
      ).setView([5.570868, -72.297333], 7, {});

      var def = this._rpc({ route: "/website_aliados/aliados/" }).then(
        function (data) {
          var categories = {};
          var cities = {};
          if (data.error) {
            return;
          }

          if (_.isEmpty(data)) {
            return;
          }

          function makeOption(p) {
            return $('<option value="' + p.id + '">' + p.title + "</option>");
          }
          /**
           * Fill every select option in an alphabetical order
           * first block fill all published contacts.
           * as every contact has a city, category, we fill consecuently the categories and cities
           * using a dict, so there is not duplicates.
           */
          _.each(data, function (partner, index) {
            _.each(partner.categories, function (cat) {
              categories[cat.id] = cat;
            });
            cities[partner.city.id] = partner.city;
            self.select_aliado_id.append(makeOption(partner));
          });

          /** After fill all partner data into dictionaries
           * we must convert this into an array since we need to sort alphabetically the categories and the cities.
           */
          _.each(
            _.map(categories, function (d) {
              return d;
            }).sort((l, r) => (l.title > r.title ? 1 : -1)),
            function (c) {
              self.select_aliado_category_id.append(makeOption(c));
            }
          );
          _.each(
            _.map(cities, function (d) {
              return d;
            }).sort((l, r) => (l.title > r.title ? 1 : -1)),
            function (c) {
              self.select_aliado_city_id.append(makeOption(c));
            }
          );

          _.each(data, function (partner, index) {
            self.markers.push({
              id: partner.id,
              city: partner.city,
              categories: partner.categories,
              marker: self.createMarker(partner),
            });
          });
        }
      );

      return Promise.all([this._super.apply(this, arguments), def]);
    },
    createMarker: function (partner) {
      var popUp = qweb.render("aliados.popup", partner);
      var params = {
        title: partner.title,
        alt: partner.title + "Icon",
        riseOnHover: true,
      };
      params = Object.assign(
        params,
        partner.icon
          ? {
              icon: L.icon({
                iconUrl: partner.icon,
                popupAnchor: [25, 0],
                iconSize: [50, 50],
                className: "custom-map-icon" + partner.title,
              }),
            }
          : {}
      );

      var marker = L.marker(partner.coords, params).bindPopup(popUp);
      return marker.addTo(this.aliados_map);
    },
    _show_up_markers_in_map: function () {
      for (var m in this.markers) {
        this.markers[m].marker.setOpacity(0);
        this.markers[m].marker.remove();
      }
      for (var m in this.markers_in_map) {
        this.markers_in_map[m].marker.addTo(this.aliados_map);
        this.markers_in_map[m].marker.setOpacity(1);
      }
    },
    _onChangeFilter: function (e) {
      e.preventDefault();
      this._update_markers_in_map();
      this._show_up_markers_in_map();
      return false;
    },
    _getMarker: function (id, type) {
      var m = this.markers;
      switch (type) {
        case "aliado":
          for (var c in this.markers) {
            if (m[c].id != id) continue;
            return m[c];
          }
          break;
        case "ciudad":
          for (var c in this.markers) {
            if (m[c].city.id != id) continue;
            return m[c];
          }
          break;
        case "categoria":
          function _has_category(cat, f) {
            for (var i in cat) {
              if (cat[i].id != f) continue;
              return true;
            }
            return false;
          }
          for (var c in this.markers) {
            if (!_has_category(m[c].categories, id)) continue;
            return m[c];
          }
          break;

        default:
          return {};
          break;
      }
      return {};
    },
    _update_markers_in_map: function () {
      var aliados = this.select_aliado_id.val();
      var ciudad = this.select_aliado_city_id.val();
      var categoria = this.select_aliado_category_id.val();
      var self = this;
      var a_markers = [],
        b_markers = [],
        c_markers = [],
        d_markers = [];
      this.markers_in_map = [];
      function _get_filtered_markers(list, type) {
        var t = [];
        if (list.length < 1 || (list.length <= 1 && list[0] == "all")) {
          t = [...self.markers];
        } else {
          _.each(list, function (o) {
            t.push(self._getMarker(o, type));
          });
        }
        return [...t];
      }

      a_markers = _get_filtered_markers(aliados, "aliado");
      b_markers = _get_filtered_markers(ciudad, "ciudad");
      c_markers = _get_filtered_markers(categoria, "categoria");
      d_markers = this._getMatching(a_markers, b_markers);
      this.markers_in_map = this._getMatching(d_markers, c_markers);
    },
    _getMatching: function (a, b) {
      var matching = [];
      _.each(a, function (a_marker) {
        if (!a_marker.hasOwnProperty("id")) return;
        _.each(b, function (b_marker) {
          if (!b_marker.hasOwnProperty("id")) return;
          if (a_marker.id == b_marker.id) matching.push(a_marker);
        });
      });
      return [...matching];
    },
  });
});
