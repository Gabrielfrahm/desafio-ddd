import { RepositoryInterface } from "../../@shared/repository/repository-interface";
import { Product } from "../entity/product";

interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

export { ProductRepositoryInterface };
