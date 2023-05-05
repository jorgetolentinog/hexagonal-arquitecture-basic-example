import { AppointmentRepository } from "../domain/repositories/AppointmentRepository";
import { UniqueId } from "../domain/ports/UniqueId";
import { Mailer } from "../domain/ports/Mailer";
import { Appointment } from "../domain/entities/Appointment";

export class AppointmentCreator {
  private _bookingRepository: AppointmentRepository;
  private _uniqueId: UniqueId;
  private _mailer: Mailer;

  constructor(props: {
    bookingRepository: AppointmentRepository;
    uniqueId: UniqueId;
    mailer: Mailer;
  }) {
    this._bookingRepository = props.bookingRepository;
    this._uniqueId = props.uniqueId;
    this._mailer = props.mailer;
  }

  async execute(props: { date: string; email: string }) {
    const appointment = Appointment.create({
      id: this._uniqueId.generate(),
      date: props.date,
      email: props.email,
    });

    await this._bookingRepository.save(appointment);

    await this._mailer.send({
      to: appointment.email,
      subject: "Reserva creada",
      body: `Tu reserva de el ${appointment.date} ha sido creada`,
    });
  }
}
