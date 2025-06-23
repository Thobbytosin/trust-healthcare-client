import { isServerOnline } from "@/utils/isServerOnline";

export const useServerStatusUniversal = async () => {
  const online = await isServerOnline();

  return {
    isOnline: online,
    serverError: !online,
  };
};
