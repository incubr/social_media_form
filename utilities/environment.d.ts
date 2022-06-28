namespace NodeJS {
  interface ProcessEnv extends NodeJS.Process {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET_KEY: string;
    REDIRECT_URI: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    SENDER_EMAIL: string;
    NEXT_PUBLIC_OFFICE_RECIVERS: string;
  }
}
