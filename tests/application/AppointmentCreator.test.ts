import { mock } from "jest-mock-extended";
import { AppointmentCreator } from "../../src/application/AppointmentCreator";
import { Mailer } from "../../src/domain/ports/Mailer";
import { UniqueId } from "../../src/domain/ports/UniqueId";
import { AppointmentRepository } from "../../src/domain/repositories/AppointmentRepository";
import { EventBroker } from "../../src/domain/ports/EventBroker";

test("Deberia crear una reserva", async () => {
  // Arrange
  const uniqueId = mock<UniqueId>();
  const appointmentRepository = mock<AppointmentRepository>();
  const eventBroker = mock<EventBroker>();

  uniqueId.generate.mockReturnValue("123");
  const usecase = new AppointmentCreator({
    appointmentRepository,
    uniqueId,
    eventBroker,
  });
  const date = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  // Act
  await usecase.execute({
    date: date,
    email: "jorge.tolentino@continuum.cl",
  });

  // Assert
  expect(uniqueId.generate).toHaveBeenCalled();
  expect(appointmentRepository.save).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "123",
      date: date,
      email: "jorge.tolentino@continuum.cl",
    })
  );
  expect(eventBroker.publish).toHaveBeenCalledWith(
    expect.objectContaining({
      eventName: "appointment.created",
    })
  );
});

test("Deberia lanzar error de fecha incorrecta", async () => {
  // Arrange
  const uniqueId = mock<UniqueId>();
  const appointmentRepository = mock<AppointmentRepository>();
  const eventBroker = mock<EventBroker>();

  uniqueId.generate.mockReturnValue("123");
  const usecase = new AppointmentCreator({
    appointmentRepository,
    uniqueId,
    eventBroker,
  });
  const date = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Act
  const promise = usecase.execute({
    date: date,
    email: "jorge.tolentino@continuum.cl",
  });

  // Assert
  await expect(promise).rejects.toThrowError("Date cannot be in the future");
});
