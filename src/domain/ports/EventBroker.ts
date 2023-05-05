export interface EventBroker {
  publish(props: {
    eventName: string;
    body: Record<string, unknown>;
  }): Promise<void>;
}
