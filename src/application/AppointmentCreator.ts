import { AppointmentRepository } from "../domain/repositories/AppointmentRepository";
import { UniqueId } from "../domain/ports/UniqueId";
import { Appointment } from "../domain/entities/Appointment";
import { EventBroker } from "../domain/ports/EventBroker";

export class AppointmentCreator {
  private _appointmentRepository: AppointmentRepository;
  private _uniqueId: UniqueId;
  private _eventBroker: EventBroker;

  constructor(props: {
    appointmentRepository: AppointmentRepository;
    uniqueId: UniqueId;
    eventBroker: EventBroker;
  }) {
    this._appointmentRepository = props.appointmentRepository;
    this._uniqueId = props.uniqueId;
    this._eventBroker = props.eventBroker;
  }

  async execute(props: { date: string; email: string }) {
    const appointment = Appointment.create({
      id: this._uniqueId.generate(),
      date: props.date,
      email: props.email,
    });

    await this._appointmentRepository.save(appointment);

    await this._eventBroker.publish({
      eventName: "appointment.created",
      body: appointment.toJSON(),
    });
  }
}
