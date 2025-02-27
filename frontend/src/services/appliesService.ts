import { Apply } from "@/interfaces/Apply";
import apiClient from "./apiClient";
import { ResponseApi } from "@/interfaces/ResponseApi";

export const getApplies = async (): Promise<ResponseApi<Apply[]>> => {
  const response = await apiClient.get("/applies");
  return response.data.data;
};

export const getApply = async (id: string): Promise<ResponseApi<Apply>> => {
  const response = await apiClient.get(`/applies/${id}`);
  return response.data.data;
};

export const createApplyByUrl = async (
  url: string
): Promise<ResponseApi<Apply>> => {
  const response = await apiClient.post("/applies", {
    url,
  });
  return response.data;
};

export const updateApply = async (
  id: string,
  apply: Apply
): Promise<ResponseApi<Apply>> => {
  const response = await apiClient.put(`/applies/${id}`, apply);
  return response.data.data;
};

export const deleteApply = async (id: string): Promise<ResponseApi<Apply>> => {
  const response = await apiClient.delete(`/applies/${id}`);
  return response.data.data;
};

