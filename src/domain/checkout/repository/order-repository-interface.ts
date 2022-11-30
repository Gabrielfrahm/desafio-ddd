import { Order } from "../entity/order";
import { RepositoryInterface } from "../../@shared/repository/repository-interface";

interface OrderRepositoryInterface extends RepositoryInterface<Order> {}

export { OrderRepositoryInterface };
