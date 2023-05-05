export interface Mailer {
  send(props: { to: string; subject: string; body: string }): Promise<void>;
}
