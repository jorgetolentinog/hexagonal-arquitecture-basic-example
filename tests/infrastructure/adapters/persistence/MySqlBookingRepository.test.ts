import { Appointment } from "../../../../src/domain/entities/Appointment";
import { MySqlAppointmentRepository } from "../../../../src/infrastructure/adapters/repositories/MySqlAppointmentRepository";

test("Deberia insertar registro en la tabla de reservas", async () => {
  // Arrange
  const repository = new MySqlAppointmentRepository();

  // Act
  await repository.save(
    new Appointment({
      id: "1",
      date: new Date().toISOString(),
      email: "jorge.tolentino@continuum.cl",
      createdAt: new Date().toISOString(),
    })
  );
  // const rows = mysql.query("SELECT * FROM bookings WHERE id = 1")

  // Assert
  // expect(rows).toHaveLength(1)
  // expect(rows[0].id).toEqual("1")
  // expect(rows[0].date).toEqual("2021-01-01")
  // expect(rows[0].email).toEqual("test@test.com")
});
