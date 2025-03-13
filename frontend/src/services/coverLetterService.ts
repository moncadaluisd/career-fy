import { ResponseApi } from "@/interfaces/ResponseApi";
import apiClient from "./apiClient";
import { Curriculum } from "@/interfaces/Curriculum";
import { Coverletter } from "@/interfaces/Coverletter";
export const generateCoverLetter = async ({
  curriculumId,
  applyId,
  isShort = false,
}: {
  curriculumId: string;
  applyId: string;
  isShort?: boolean;
}): Promise<ResponseApi<Curriculum>> => {
  const response = await apiClient.post<ResponseApi<Curriculum>>(
    "/coverletters",
    {
      curriculumId,
      applyId,
      isShort,
    }
  );
  return response.data;
};

export const regenerateCoverLetter = async (
  coverletterId: string,
  message: string
): Promise<ResponseApi<Coverletter>> => {
  const response = await apiClient.post<ResponseApi<Coverletter>>(`/coverletters/${coverletterId}/message`, { message });
  return response.data;
};

export const getConverLetters = async (
  curriculumId: string | null,
  applyId: string | null
): Promise<ResponseApi<Coverletter[]>> => {
  const query: { curriculumId?: string; applyId?: string } = {};

  if (curriculumId) {
    query.curriculumId = curriculumId;
  }

  if (applyId) {
    query.applyId = applyId;
  }
  const response = await apiClient.get<ResponseApi<Coverletter[]>>(
    `/coverletters`,
    { params: query }
  );
  return response.data;
};

export const deleteCoverLetter = async (id: string): Promise<ResponseApi<void>> => {
  const response = await apiClient.delete<ResponseApi<void>>(`/coverletters/${id}`);
  return response.data;
};

