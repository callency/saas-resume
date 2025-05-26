import type { TemplateDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { TEMPLATES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchTemplates = async () => {
  const response = await axios.get<{ builtIn: string[]; community: TemplateDto[] }>(`/template`);

  return response.data;
};

export const useTemplates = () => {
  const {
    error,
    isPending: loading,
    data,
  } = useQuery({
    queryKey: TEMPLATES_KEY,
    queryFn: fetchTemplates,
  });

  return { templates: data, loading, error };
};
