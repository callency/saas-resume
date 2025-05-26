import type { UpdateStatisticsDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const sendResumeAnalytics = async (data: { id: string; analytics: UpdateStatisticsDto }) => {
  await axios.post(`/resume/${data.id}/statistics`, data.analytics);
};

export const useSendResumeAnalytics = () => {
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: sendResumeAnalytics,
  });

  return { sendResumeAnalytics: mutateAsync, loading, error };
};
