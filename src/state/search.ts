import { atom } from "jotai";
import { productsState } from "./products";
import { flashSaleProductsState } from "./flash-sale";

export const keywordState = atom("");

export const searchResultState = atom(async (get) => {
  const keyword = get(keywordState);
  const products = await get(productsState);
  const flashSaleProducts = await get(flashSaleProductsState);
  
  // Merge cả hai danh sách để search
  const allProducts = [...products, ...flashSaleProducts];
  
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
});

