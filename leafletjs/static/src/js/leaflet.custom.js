"use strict";
window.leafletMaps = {};

L.Map.addInitHook(function () {
  window.leafletMaps[this._container] = this;
});

L.getMapById = function (id) {
  var obj = document.getElementById(id);
  if (!obj) throw new Error("Map container not found.");
  return window.leafletMaps[obj];
};
