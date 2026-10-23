// CARTO basemap used by route.html, italy2026.html and sweden2024.html.
// Replace XXXX with your key. Restrict the key to biketoured.github.io in the
// CARTO dashboard: anything in this file is public.
window.CARTO_TILES = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_2x4a_1_e703911ee1e47da4098ddd6d';

// Builds the CARTO layer. If a CARTO tile fails to load (bad or revoked key,
// outage), the layer switches once to plain OpenStreetMap tiles so the map
// is never blank. Note: CARTO's "API KEY REQUIRED" watermark arrives as a
// normal image, so it does NOT trigger this; check the map after key changes.
window.cartoLayer = function (options) {
  const layer = L.tileLayer(window.CARTO_TILES, Object.assign({
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  }, options));
  let switched = false;
  layer.on('tileerror', function () {
    if (switched) return;
    switched = true;
    console.warn('CARTO tiles failed, falling back to OpenStreetMap');
    layer.setUrl('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
    layer.options.maxZoom = 19;
  });
  return layer;
};
