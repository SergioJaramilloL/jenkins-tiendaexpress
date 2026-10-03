// Genera la carpeta dist/ con el código listo para usar y un archivo con datos del build.
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', 'src', 'carrito.js'), path.join(dist, 'carrito.js'));

const info = {
  proyecto: 'tiendaexpress-ci',
  build: process.env.BUILD_NUMBER || 'local',
  commit: process.env.GIT_COMMIT || 'local',
  fecha: new Date().toISOString(),
};
fs.writeFileSync(path.join(dist, 'build-info.json'), JSON.stringify(info, null, 2));
console.log('Build generado en dist/:', info);
