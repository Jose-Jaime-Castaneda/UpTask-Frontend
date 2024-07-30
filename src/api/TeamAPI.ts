import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  Project,
  teamMember,
  teamMemberForm,
  teamMembersSchema,
} from "../types";

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: teamMemberForm;
}) {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
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

export async function addUserToProyect({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: teamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
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

export async function getProjectTeam(projectId: Project["_id"]) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get(url);
    const response = teamMembersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
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

export async function removeUser({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: teamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team/${id}`;
    const { data } = await api.delete<string>(url);
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