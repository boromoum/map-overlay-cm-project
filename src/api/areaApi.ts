import type AreaResponse from "@/types/area";
import apiClient from "./http";

export const getAllAreas = async () => {
  const response = await apiClient.get<AreaResponse[]>(`areas`);
  return response.data;
};