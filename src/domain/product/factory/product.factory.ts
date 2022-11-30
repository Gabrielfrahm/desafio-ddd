import { v4 as uuid } from "uuid";
import { Product } from "../entity/product";

class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    return new Product(uuid(), name, price);
  }
}

export { ProductFactory };
