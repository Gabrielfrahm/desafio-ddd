import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("customer factory unit tests", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("rua 1", 123, "13348-550", "Indaiatuba");
    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});
