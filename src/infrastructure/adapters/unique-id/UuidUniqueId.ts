import { v4 as uuidv4 } from "uuid";
import { UniqueId } from "../../../domain/ports/UniqueId";

export class UuidUniqueId implements UniqueId {
  generate(): string {
    return uuidv4();
  }
}
