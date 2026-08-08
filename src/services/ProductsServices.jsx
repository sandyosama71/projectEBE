export async function getProducts() {
  const response = await fetch("http://localhost:3001/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}



export async function deleteProduct(id) {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}


export async function addProduct(product) {
  const response = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return await response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
}