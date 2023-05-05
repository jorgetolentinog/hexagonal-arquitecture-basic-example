import { Mailer } from "../../../domain/ports/Mailer";

export class SengridMailer implements Mailer {
  async send(data: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    console.log("Email enviado con sendgrid", data);
  }
}
