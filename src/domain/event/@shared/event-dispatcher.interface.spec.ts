import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events test", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreateEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      0
    );
  });

  it("should unregister all events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBe(
      undefined
    );
  });

  it("should notify all events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
