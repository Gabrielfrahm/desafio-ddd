import { Customer } from "../entity/customer";
import { RepositoryInterface } from "./repository-interface";

interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
export { CustomerRepositoryInterface };
