import { Project, teamMember } from "../types";

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}

export const isManager = (
  managerId: Project["manager"],
  userId: teamMember["_id"]
) => managerId === userId;
