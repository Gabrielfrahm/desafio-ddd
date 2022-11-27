import { EventHandleInterface } from "../../@shared/event-handle.interface";
import { EventInterface } from "../../@shared/event.interface";
import { ProductCreatedEvent } from "../product-created.event";

class SendEmailWhenProductIsCreatedHandler
  implements EventHandleInterface<ProductCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log(`Sending email to ....`);
  }
}

export { SendEmailWhenProductIsCreatedHandler };
