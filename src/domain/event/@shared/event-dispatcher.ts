import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandleInterface } from "./event-handle.interface";
import { EventInterface } from "./event.interface";

class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandleInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandleInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }
  register(
    eventName: string,
    eventHandle: EventHandleInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandle);
  }
  unregister(
    eventName: string,
    eventHandle: EventHandleInterface<EventInterface>
  ): void {
    throw new Error("Method not implemented.");
  }
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}

export { EventDispatcher };
