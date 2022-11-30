import console from "console";
import { where } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../../domain/customer/value-object/address";

import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./order-item.model";

import { ProductModel } from "../../../product/repository/sequelize/product.model";

import { OrderRepository } from "./order.repository";
import { OrderModel } from "./order.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { Product } from "../../../../domain/product/entity/product";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Order } from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderItemModel,
      OrderModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 20, "13348-555", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", " Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: product.id,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 20, "13348-555", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", " Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "124",
      product.name,
      product.price,
      product.id,
      3
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);
    await orderRepository.create(order);

    order.addItems([orderItem2]);
    await orderRepository.update(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: product.id,
          order_id: order.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: product.id,
          order_id: order.id,
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 20, "13348-555", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", " Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    const orderFounder = await orderRepository.find(order.id);
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderFounder.id,
      customer_id: orderFounder.customerId,
      total: orderFounder.total(),
      items: orderFounder.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        order_id: orderFounder.id,
        quantity: item.quantity,
      })),
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 20, "13348-555", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", " Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "124",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();

    const order = new Order("123", customer.id, [orderItem]);
    const order2 = new Order("124", customer.id, [orderItem2]);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    const orders = [order, order2];

    expect(foundOrders).toEqual(orders);
  });

  it("should delete an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 20, "13348-555", "Indaiatuba");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", " Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);
    await orderRepository.create(order);
    let foundOrders = await orderRepository.findAll();

    expect(foundOrders.length).toBe(1);

    await orderRepository.delete(order.id);
    foundOrders = await orderRepository.findAll();

    expect(foundOrders.length).toBe(0);
  });
});
