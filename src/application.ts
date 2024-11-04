import { BotpressClient, type BotpressClientConfig } from "./modules";

export class Application {
  private botpress_client!: BotpressClient;

  constructor(config: { botpress_agent_config: BotpressClientConfig }) {
    this.botpress_client = new BotpressClient(config.botpress_agent_config);
  }
}
