import { Appointment } from "../entities/Appointment";

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
}
