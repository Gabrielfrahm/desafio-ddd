import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository-interface";

interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

export { ProductRepositoryInterface };
