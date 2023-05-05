import { EventBroker } from "../../../domain/ports/EventBroker";

export class RabbitMQEventBroker implements EventBroker {
  async publish(props: {
    eventName: string;
    body: Record<string, unknown>;
  }): Promise<void> {
    console.log(`Publishing event ${props.eventName} with body:`, props.body);
  }
}
