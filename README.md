# tiendaexpress-ci

Módulo de carrito y checkout de **TiendaExpress** (subtotal, cupones de descuento y costo de envío) usado para practicar Integración Continua con Jenkins.

Autor: Sergio Andrés Jaramillo Luna — Especialización en Desarrollo de Software, UCP.

## Comandos

```bash
npm ci          # instala dependencias
npm run build   # genera dist/
npm test        # ejecuta pruebas con Jest y genera reports/junit.xml
```

## Jenkins local

```bash
docker compose up -d --build
```

Jenkins queda disponible en http://localhost:8080. El pipeline está definido en el `Jenkinsfile` de la raíz.
