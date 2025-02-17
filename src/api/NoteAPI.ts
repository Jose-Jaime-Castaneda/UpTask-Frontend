import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

export async function createNote({
  projectId,
  taskId,
  formData,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data.error;
      if (
        Array.isArray(errorData) &&
        errorData.length > 0 &&
        errorData[0].msg
      ) {
        throw new Error(errorData[0].msg);
      } else {
        throw new Error(errorData);
      }
    }
  }
}

export async function deleteNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data.error;
      if (
        Array.isArray(errorData) &&
        errorData.length > 0 &&
        errorData[0].msg
      ) {
        throw new Error(errorData[0].msg);
      } else {
        throw new Error(errorData);
      }
    }
  }
}
