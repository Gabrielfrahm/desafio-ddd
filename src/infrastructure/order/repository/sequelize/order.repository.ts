import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order-repository-interface";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";

class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
      });

      entity.items.map(
        async (item) =>
          await OrderItemModel.create({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          })
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw new Error("error in update order");
    }
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
      });
      const items: OrderItem[] = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );
      return new Order(orderModel.id, orderModel.customer_id, items);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: ["items"] });

    const orders = ordersModel.map((order) => {
      const items = order.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });
      return new Order(order.id, order.customer_id, items);
    });

    return orders;
  }

  async delete(id: string): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderItemModel.destroy({ where: { order_id: id } });
      await OrderModel.destroy({ where: { id } });
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw new Error(`${error}`);
    }
  }
}

export { OrderRepository };
