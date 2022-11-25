import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("id is required");
  });
  it("Should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("customerId is required");
  });
  it("Should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("items are required");
  });
  it("Should calculate total", () => {
    const item1 = new OrderItem("i1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "item 2", 100, "p2", 3);
    const order = new Order("123", "123", [item1]);
    let total = order.total();
    expect(total).toBe(200);
    const order2 = new Order("1234", "1234", [item1, item2]);
    total = order2.total();
    expect(total).toBe(500);
  });
  it("Should throw error when item quantity is less or equal than 0", () => {
    expect(() => {
      const item1 = new OrderItem("i1", "item 1", 100, "p1", 0);
      const order = new Order("123", "123", [item1]);
    }).toThrowError("quantity must be less or equal than 0");
  });
});
