import { EventInterface } from "../../@shared/event/event.interface";

class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = this.dataTimeOccurred;
    this.eventData = eventData;
  }
}

export { CustomerCreatedEvent };
