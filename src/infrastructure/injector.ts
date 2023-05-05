import { MySqlAppointmentRepository } from "./adapters/repositories/MySqlAppointmentRepository";
import { SengridMailer } from "./adapters/mailer/SengridMailer";
import { UuidUniqueId } from "./adapters/unique-id/UuidUniqueId";
import { AppointmentCreator } from "../application/AppointmentCreator";
import { RabbitMQEventBroker } from "./adapters/event-broker/RabbitMQEventBroker";

const appointmentRepository = new MySqlAppointmentRepository();
const mailer = new SengridMailer();
const uniqueId = new UuidUniqueId();
const eventBroker = new RabbitMQEventBroker();

const appointmentCreator = new AppointmentCreator({
  appointmentRepository,
  uniqueId,
  eventBroker,
});

export { appointmentCreator };
