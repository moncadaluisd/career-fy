import apiClient from "./apiClient";
import { Curriculum } from "@/interfaces/Curriculum";

export const getCurriculum = async () => {
  const response = await apiClient.get("/curriculum");
  return response.data;
};

export const getCurriculumById = async (id: string) => {
  const response = await apiClient.get(`/curriculum/${id}`);
  return response.data;
};

export const createCurriculum = async (curriculum: Curriculum) => {
  const response = await apiClient.post("/curriculum", curriculum);
  return response.data;
};

export const updateCurriculum = async (id: string, curriculum: Curriculum) => {
  const response = await apiClient.put(`/curriculum/${id}`, curriculum);
  return response.data;
};

export const deleteCurriculum = async (id: string) => {
  const response = await apiClient.delete(`/curriculum/${id}`);
  return response.data;
};