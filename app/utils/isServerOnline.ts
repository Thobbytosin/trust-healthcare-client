import { SERVER_URI } from "@/config/api";

export const isServerOnline = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${SERVER_URI}/health`);
    return res.ok;
  } catch (error) {
    return false;
  }
};
