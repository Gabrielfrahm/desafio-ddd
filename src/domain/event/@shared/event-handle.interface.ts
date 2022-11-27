import { EventInterface } from "./event.interface";

interface EventHandleInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}

export { EventHandleInterface };
