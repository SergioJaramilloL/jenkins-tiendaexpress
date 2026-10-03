// TiendaExpress - Lógica del carrito y del total del checkout
// Valores en pesos colombianos (COP).

const COSTO_ENVIO = 12000;
const MINIMO_ENVIO_GRATIS = 150000;

const CUPONES = {
  BIENVENIDA10: { tipo: 'porcentaje', valor: 10 },
  ENVIOGRATIS: { tipo: 'envio' },
};

function calcularSubtotal(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('El carrito está vacío');
  }
  return items.reduce((total, item) => {
    if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
      throw new Error(`Cantidad inválida para ${item.nombre}`);
    }
    if (typeof item.precio !== 'number' || item.precio < 0) {
      throw new Error(`Precio inválido para ${item.nombre}`);
    }
    return total + item.precio * item.cantidad;
  }, 0);
}

function aplicarDescuento(subtotal, codigoCupon) {
  if (!codigoCupon) return 0;
  const cupon = CUPONES[codigoCupon.toUpperCase()];
  if (!cupon) throw new Error(`Cupón no válido: ${codigoCupon}`);
  if (cupon.tipo === 'porcentaje') {
    return Math.round((subtotal * cupon.valor) / 100);
  }
  return 0;
}

function calcularEnvio(subtotal, codigoCupon) {
  const esEnvioGratis = codigoCupon && codigoCupon.toUpperCase() === 'ENVIOGRATIS';
  if (esEnvioGratis || subtotal >= MINIMO_ENVIO_GRATIS) return 0;
  return COSTO_ENVIO;
}

function calcularTotal(items, codigoCupon) {
  const subtotal = calcularSubtotal(items);
  const descuento = aplicarDescuento(subtotal, codigoCupon);
  const envio = calcularEnvio(subtotal, codigoCupon);
  return { subtotal, descuento, envio, total: subtotal - descuento + envio };
}

module.exports = { calcularSubtotal, aplicarDescuento, calcularEnvio, calcularTotal, COSTO_ENVIO };
