import { MySqlAppointmentRepository } from "./adapters/repositories/MySqlAppointmentRepository";
import { SengridMailer } from "./adapters/mailer/SengridMailer";
import { UuidUniqueId } from "./adapters/unique-id/UuidUniqueId";
import { AppointmentCreator } from "../application/AppointmentCreator";

const appointmentRepository = new MySqlAppointmentRepository();
const mailer = new SengridMailer();
const uniqueId = new UuidUniqueId();

const appointmentCreator = new AppointmentCreator({
  appointmentRepository,
  mailer,
  uniqueId,
});

export { appointmentCreator };
