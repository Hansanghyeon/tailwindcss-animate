const plugin = require('tailwindcss/plugin');

module.exports = plugin(api => {
  // tailwindcss animated
  require('./utilities/delay')(api);
  require('./utilities/direction')(api);
  require('./utilities/duration')(api);
  require('./utilities/fillMode')(api);
  require('./utilities/iterationCount')(api);
  require('./utilities/playState')(api);
  require('./utilities/timingFunction')(api);
  // tailwindcss animate
  require('./animated')(api);
}, {
    theme: require('./theme'),
});
