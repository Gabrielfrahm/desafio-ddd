import { OrderItem } from "./order_item";

describe("Order Item unit test", () => {
  it("should throw erro when id is empty ", () => {
    expect(() => {
      const orderItem = new OrderItem("", "n1", 100, "prod1", 1);
    }).toThrowError("id is required");
  });
  it("should throw erro when name is empty ", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "", 100, "prod1", 1);
    }).toThrowError("name is required");
  });
  it("should throw erro when productId is empty ", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "n1", 100, "", 1);
    }).toThrowError("productId is required");
  });
  it("should throw erro when price less than 0 ", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "p1", -1, "prod1", 1);
    }).toThrowError("price must be more than 0");
  });
});
