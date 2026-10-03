const {
  calcularSubtotal,
  aplicarDescuento,
  calcularEnvio,
  calcularTotal,
  COSTO_ENVIO,
} = require('../src/carrito');

const camiseta = { nombre: 'Camiseta', precio: 45000, cantidad: 2 };
const gorra = { nombre: 'Gorra', precio: 30000, cantidad: 1 };

describe('Subtotal del carrito', () => {
  test('suma precio por cantidad de cada producto', () => {
    expect(calcularSubtotal([camiseta, gorra])).toBe(120000);
  });

  test('rechaza un carrito vacío', () => {
    expect(() => calcularSubtotal([])).toThrow('El carrito está vacío');
  });

  test('rechaza cantidades en cero o negativas', () => {
    expect(() => calcularSubtotal([{ ...gorra, cantidad: 0 }])).toThrow('Cantidad inválida');
  });
});

describe('Cupones de descuento', () => {
  test('BIENVENIDA10 descuenta el 10% del subtotal', () => {
    expect(aplicarDescuento(120000, 'BIENVENIDA10')).toBe(12000);
  });

  test('el cupón no distingue mayúsculas y minúsculas', () => {
    expect(aplicarDescuento(120000, 'bienvenida10')).toBe(12000);
  });

  test('un cupón inexistente se rechaza', () => {
    expect(() => aplicarDescuento(120000, 'GRATIS100')).toThrow('Cupón no válido');
  });
});

describe('Costo de envío', () => {
  test('cobra envío si el subtotal es menor a 150.000', () => {
    expect(calcularEnvio(120000)).toBe(COSTO_ENVIO);
  });

  test('el envío es gratis desde 150.000', () => {
    expect(calcularEnvio(150000)).toBe(0);
  });

  test('ENVIOGRATIS elimina el costo de envío', () => {
    expect(calcularEnvio(50000, 'ENVIOGRATIS')).toBe(0);
  });
});

describe('Total del checkout', () => {
  test('combina subtotal, descuento y envío', () => {
    expect(calcularTotal([camiseta, gorra], 'BIENVENIDA10')).toEqual({
      subtotal: 120000,
      descuento: 12000,
      envio: COSTO_ENVIO,
      total: 120000,
    });
  });
});
