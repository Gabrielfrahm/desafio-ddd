import { Customer } from "../entity/customer";
import { RepositoryInterface } from "../../@shared/repository/repository-interface";

interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
export { CustomerRepositoryInterface };
