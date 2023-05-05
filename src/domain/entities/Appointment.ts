export class Appointment {
  id: string;
  date: string;
  email: string;
  createdAt: string;

  constructor(props: {
    id: string;
    date: string;
    email: string;
    createdAt: string;
  }) {
    this.id = props.id;
    this.date = props.date;
    this.email = props.email;
    this.createdAt = props.createdAt;
  }

  static create(props: {
    id: string;
    date: string;
    email: string;
  }): Appointment {
    if (props.date < new Date().toISOString()) {
      throw new Error("Date cannot be in the future");
    }

    return {
      id: props.id,
      date: props.date,
      email: props.email,
      createdAt: new Date().toISOString(),
    };
  }
}
