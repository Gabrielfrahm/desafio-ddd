import { EventInterface } from "../../@shared/event/event.interface";

class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = this.dataTimeOccurred;
    this.eventData = eventData;
  }
}

export { ProductCreatedEvent };
