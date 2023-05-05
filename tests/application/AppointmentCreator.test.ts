import { mock } from "jest-mock-extended";
import { AppointmentCreator } from "../../src/application/AppointmentCreator";
import { Mailer } from "../../src/domain/ports/Mailer";
import { UniqueId } from "../../src/domain/ports/UniqueId";
import { AppointmentRepository } from "../../src/domain/repositories/AppointmentRepository";

test("Deberia crear una reserva", async () => {
  // Arrange
  const uniqueId = mock<UniqueId>();
  const appointmentRepository = mock<AppointmentRepository>();
  const mailer = mock<Mailer>();

  uniqueId.generate.mockReturnValue("123");
  const usecase = new AppointmentCreator({
    appointmentRepository,
    uniqueId,
    mailer,
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
  expect(mailer.send).toHaveBeenCalledWith({
    to: "jorge.tolentino@continuum.cl",
    subject: "Reserva creada",
    body: `Tu reserva de el ${date} ha sido creada`,
  });
});

test("Deberia lanzar error de fecha incorrecta", async () => {
  // Arrange
  const uniqueId = mock<UniqueId>();
  const appointmentRepository = mock<AppointmentRepository>();
  const mailer = mock<Mailer>();

  uniqueId.generate.mockReturnValue("123");
  const usecase = new AppointmentCreator({
    appointmentRepository,
    uniqueId,
    mailer,
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
