export function getProductSlug(product) {
  return product.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatProductPrice(price) {
  return `${price.toLocaleString("en-BD")} TK`;
}
