import { Appointment } from "../../../domain/entities/Appointment";
import { AppointmentRepository } from "../../../domain/repositories/AppointmentRepository";

export class MySqlAppointmentRepository implements AppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    console.log("Reserva creada con mysql", appointment);
  }
}
