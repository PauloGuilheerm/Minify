declare namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      PORT: number;
      JWT_SECRET: string;
      DOMAIN: string; // complete domain url, for example: http://localhost:3000:/
    }
  }
  