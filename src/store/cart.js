import { map, computed } from 'nanostores';

export const cartItems = map({});

export const totalItems = computed(cartItems, (items) =>
  Object.values(items).reduce((sum, item) => sum + item.cantidad, 0)
);

export const totalPrice = computed(cartItems, (items) =>
  Object.values(items).reduce((sum, item) => sum + item.precio * item.cantidad, 0)
);

export function addToCart(product) {
  const current = cartItems.get();
  const existing = current[product.nombre];
  if (existing) {
    cartItems.setKey(product.nombre, {
      ...existing,
      cantidad: existing.cantidad + 1,
    });
  } else {
    cartItems.setKey(product.nombre, {
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen || '',
      cantidad: 1,
    });
  }
}

export function removeFromCart(nombre) {
  cartItems.setKey(nombre, undefined);
}

export function incrementQuantity(nombre) {
  const item = cartItems.get()[nombre];
  if (!item) return;
  cartItems.setKey(nombre, { ...item, cantidad: item.cantidad + 1 });
}

export function decrementQuantity(nombre) {
  const item = cartItems.get()[nombre];
  if (!item) return;
  if (item.cantidad > 1) {
    cartItems.setKey(nombre, { ...item, cantidad: item.cantidad - 1 });
  } else {
    cartItems.setKey(nombre, undefined);
  }
}

export function clearCart() {
  cartItems.set({});
}
