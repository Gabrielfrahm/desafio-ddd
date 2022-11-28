import { EventHandleInterface } from "../../@shared/event-handle.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

class SendConsoleLog1WhenCustomerIsCreatedHandler
  implements EventHandleInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}

export { SendConsoleLog1WhenCustomerIsCreatedHandler };
