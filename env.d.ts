declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;

    BOTPRESS_TOKEN: String;
    BOTPRESS_WORKSPACE_ID: String;
    BOTPRESS_BOT_ID: String;
  }
}
