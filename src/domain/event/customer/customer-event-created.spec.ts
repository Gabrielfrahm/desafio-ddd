import { Customer } from "../../entity/customer";
import { EventDispatcher } from "../@shared/event-dispatcher";
import { CustomerCreatedEvent } from "./customer-created.event";
import { SendConsoleLog1WhenCustomerIsCreatedHandler } from "./handler/send-console-log1-when-customer-is-created.handler";
import { SendConsoleLog2WhenCustomerIsCreatedHandler } from "./handler/send-console-log2-when-customer-is-created.handler";

describe("Domain events test", () => {
  it("should create customer handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customer = new Customer("123", "Customer 1");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
