import { Address } from "../../entity/address";
import { Customer } from "../../entity/customer";
import { EventDispatcher } from "../@shared/event-dispatcher";
import { CustomerChangedAddressEvent } from "./customer-changed-address.event";
import { SendConsoleLogWhenCustomerAddressIsChangedHandler } from "./handler/send-console-log-when-customer-address-is-changed.handler";

describe("Domain events test", () => {
  it("should notify all events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 =
      new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("rua 1", 10, "13348-550", "Indaiatuba");
    customer.Address = address;

    const customerChangedAddressEvent = new CustomerChangedAddressEvent(
      customer
    );

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
  });
});
