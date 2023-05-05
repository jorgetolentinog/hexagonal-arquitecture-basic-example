import { AppointmentRepository } from "../domain/repositories/AppointmentRepository";
import { UniqueId } from "../domain/ports/UniqueId";
import { Mailer } from "../domain/ports/Mailer";
import { Appointment } from "../domain/entities/Appointment";

export class AppointmentCreator {
  private _appointmentRepository: AppointmentRepository;
  private _uniqueId: UniqueId;
  private _mailer: Mailer;

  constructor(props: {
    appointmentRepository: AppointmentRepository;
    uniqueId: UniqueId;
    mailer: Mailer;
  }) {
    this._appointmentRepository = props.appointmentRepository;
    this._uniqueId = props.uniqueId;
    this._mailer = props.mailer;
  }

  async execute(props: { date: string; email: string }) {
    const appointment = Appointment.create({
      id: this._uniqueId.generate(),
      date: props.date,
      email: props.email,
    });

    await this._appointmentRepository.save(appointment);

    await this._mailer.send({
      to: appointment.email,
      subject: "Reserva creada",
      body: `Tu reserva de el ${appointment.date} ha sido creada`,
    });
  }
}
