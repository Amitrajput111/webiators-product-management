let memoryCache = {};
let memoryList = [];

export const getCachedProduct = (id) => {
  if (!id) return null;
  if (memoryCache[id]) return memoryCache[id];
  return memoryList.find((p) => String(p._id || p.id) === String(id)) || null;
};

export const setCachedProduct = (product) => {
  if (!product) return;
  const id = product._id || product.id;
  if (id) {
    memoryCache[id] = product;
    const index = memoryList.findIndex((p) => String(p._id || p.id) === String(id));
    if (index >= 0) {
      memoryList[index] = product;
    } else {
      memoryList.push(product);
    }
  }
};

export const setCachedProductList = (products) => {
  if (Array.isArray(products)) {
    memoryList = products;
    products.forEach((p) => {
      const id = p._id || p.id;
      if (id) memoryCache[id] = p;
    });
  }
};

export const getCachedProductList = () => memoryList;
