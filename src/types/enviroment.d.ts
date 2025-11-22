declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";

      DB_FILE_NAME: string;

      BETTER_AUTH_SECRET: string;
    }
  }
}

export {};
