import { EventHandleInterface } from "../../../@shared/event/event-handle.interface";
import { CustomerChangedAddressEvent } from "../customer-changed-address.event";

class SendConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandleInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    const { id, name, address } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address}`
    );
  }
}

export { SendConsoleLogWhenCustomerAddressIsChangedHandler };
