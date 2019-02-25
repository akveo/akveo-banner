const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/akveo-banner/runtime.js',
    './dist/akveo-banner/polyfills.js',
    './dist/akveo-banner/scripts.js',
    './dist/akveo-banner/main.js'
  ];

  await fs.ensureDir('package-build');
  await concat(files, 'package-build/akveo-banner.js');
  await fs.copyFile(
    './dist/akveo-banner/styles.css',
    'package-build/styles.css'
  );
  await fs.copyFile(
    './scripts/package.json',
    'package-build/package.json'
  );
})();
