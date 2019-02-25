const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/akveo-banner/runtime.js',
    './dist/akveo-banner/polyfills.js',
    './dist/akveo-banner/scripts.js',
    './dist/akveo-banner/main.js'
  ];

  await fs.ensureDir('lib');
  await concat(files, 'lib/akveo-banner.js');
  await fs.copyFile(
    './dist/akveo-banner/styles.css',
    'lib/styles.css'
  );
})();
