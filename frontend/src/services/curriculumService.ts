import { ResponseApi } from "@/interfaces/ResponseApi";
import apiClient from "./apiClient";
import { Curriculum } from "@/interfaces/Curriculum";

export const getCurriculums = async (): Promise<
  ResponseApi<Curriculum[] | []>
> => {
  const response = await apiClient.get<ResponseApi<Curriculum[]>>(
    "/curriculums"
  );
  return response.data;
};

export const getCurriculumById = async (
  id: string
): Promise<ResponseApi<Curriculum>> => {
  const response = await apiClient.get<ResponseApi<Curriculum>>(
    `/curriculums/${id}`
  );
  return response.data;
};

export const createCurriculum = async (
  curriculum: Curriculum
): Promise<ResponseApi<Curriculum>> => {
  const response = await apiClient.post<ResponseApi<Curriculum>>(
    "/curriculums",
    curriculum
  );
  return response.data;
};

export const updateCurriculum = async (
  id: string,
  curriculum: Curriculum
): Promise<ResponseApi<Curriculum>> => {
  const response = await apiClient.put<ResponseApi<Curriculum>>(
    `/curriculums/${id}`,
    curriculum
  );
  return response.data;
};

export const deleteCurriculum = async (
  id: string
): Promise<ResponseApi<Curriculum>> => {
  const response = await apiClient.delete<ResponseApi<Curriculum>>(
    `/curriculums/${id}`
  );
  return response.data;
};

