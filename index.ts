import { Application } from "./src";

export function get_config(): any {
  return {
    botpress_agent_config: {
      token: process.env.BOTPRESS_TOKEN,
      workspace_id: process.env.BOTPRESS_WORKSPACE_ID,
      bot_id: process.env.BOTPRESS_BOT_ID,
    },
  };
}

export function main() {
  return new Application(get_config());
}

main();
