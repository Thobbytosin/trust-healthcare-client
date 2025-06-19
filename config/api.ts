export const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

if (!SERVER_URI) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_SERVER_URI is not defined. Please check your .env file."
  );
}
