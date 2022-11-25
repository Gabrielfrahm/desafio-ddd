import { Order } from "../entity/order";
import { RepositoryInterface } from "./repository-interface";

interface OrderRepositoryInterface extends RepositoryInterface<Order> {}

export { OrderRepositoryInterface };
