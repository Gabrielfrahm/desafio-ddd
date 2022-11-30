import { EventHandleInterface } from "../../../@shared/event/event-handle.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

class SendConsoleLog2WhenCustomerIsCreatedHandler
  implements EventHandleInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}

export { SendConsoleLog2WhenCustomerIsCreatedHandler };
