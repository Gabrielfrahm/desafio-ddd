import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";

import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 20, "13558-480", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 20, "13558-480", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    customer.changeName("name change");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 20, "13558-480", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
      street: foundCustomer.address.street,
      number: address.number,
      zipcode: foundCustomer.address.zip,
      city: foundCustomer.address.city,
    });
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("4554");
    }).rejects.toThrow("customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 20, "13558-480", "Indaiatuba");
    customer.Address = address;
    customer.addRewardPoints(10);
    customer.isActive();
    await customerRepository.create(customer);

    const customer2 = new Customer("1234", "Customer 2");
    const address2 = new Address("rua 2", 20, "13558-480", "Indaiatuba");
    customer2.Address = address2;
    customer2.addRewardPoints(10);
    customer2.isActive();
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });

  it("should delete a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 20, "13558-480", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);
    let customerModel = await CustomerModel.findAll();
    expect(customerModel.length).toBe(1);
    await customerRepository.delete(customer.id);
    customerModel = await CustomerModel.findAll();
    expect(customerModel.length).toBe(0);
  });
});
