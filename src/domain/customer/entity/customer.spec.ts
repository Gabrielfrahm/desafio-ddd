import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Doe");
    }).toThrowError("id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("name is required");
  });

  it("Should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");
    // Act
    customer.changeName("John doe");
    // Assert
    expect(customer.name).toBe("John doe");
  });

  it("Should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "13350-250", "Indaiatuba");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("Should deactivate customer", () => {
    const customer = new Customer("123", "Customer 1");

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("Should throw error when address is undefined when activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("id", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
