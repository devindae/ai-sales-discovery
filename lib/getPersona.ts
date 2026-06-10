import { personas } from "./personas";

export function getPersona(id: string) {
  return personas[id as keyof typeof personas];
}