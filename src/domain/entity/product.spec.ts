import { Product } from "./product";

describe("Product unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("id is required");
  });
  it("Should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("p1", "", 100);
    }).toThrowError("name is required");
  });
  it("Should throw error when price is less than 0", () => {
    expect(() => {
      const product = new Product("p1", "Product 1", -1);
    }).toThrowError("price must be greater than zero");
  });
  it("Should change name", () => {
    const product = new Product("p1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });
  it("Should change price", () => {
    const product = new Product("p1", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
