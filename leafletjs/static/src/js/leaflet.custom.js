"use strict";
window.L_DISABLE_3D = true;
window.leafletMaps = {};

L.Map.addInitHook(function () {
  window.leafletMaps[this._container] = this;
});

L.getMapById = function (id) {
  var obj = document.getElementById(id);
  if (!obj) throw new Error("Map container not found.");
  return window.leafletMaps[obj];
};
