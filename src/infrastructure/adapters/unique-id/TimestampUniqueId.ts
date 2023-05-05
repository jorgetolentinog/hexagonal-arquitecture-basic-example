import { UniqueId } from "../../../domain/ports/UniqueId";

export class TimestampUniqueId implements UniqueId {
  generate(): string {
    return new Date().getTime().toString();
  }
}
