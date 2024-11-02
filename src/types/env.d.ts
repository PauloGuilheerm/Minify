declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASS: string;
      JWT_SECRET: string;
      DOMAIN: string;
      PORT: number;
    }
  }
  