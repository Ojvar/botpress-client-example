import fs from "fs";
import { Client, type ClientOutputs, type ListTablesResponse } from "@botpress/client";

export type ConversationItem = any;
export type ConversationItems = ConversationItem[];
export type Bot = any;

export type BotpressClientConfig = {
  workspace_id: string;
  bot_id: string;
  token: string;
};

export class BotpressClient {
  private client!: Client;

  constructor(private config: BotpressClientConfig) {
    this.new_client();
  }

  new_client(): void {
    const token = this.config.token;
    const workspaceId = this.config.workspace_id;
    const botId = this.config.bot_id;

    this.client = new Client({ token, workspaceId, botId });
  }

  async get_bot(): Promise<Bot> {
    const { bot } = await this.client.getBot({ id: this.config.bot_id });
    return bot;
  }

  latest_conversations(options: any): Promise<ConversationItem> {
    options = {
      sortField: "createdAt",
      sortDirection: "desc",
      integrationName: "instagram",
      limit: 1,
      ...options,
    };
    return this.client.list
      .conversations(options)
      .collect({ limit: options.limit });
  }

  get_files(options: object = {}): Promise<{ files: object[]; meta: object }> {
    return this.client.listFiles(options);
  }

  async upload_file(
    filename: string,
    uploadFilename: string,
    options: object = {},
  ): Promise<ClientOutputs["uploadFile"]> {
    // Define the file you want to upload
    const filePath = filename;
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Call the uploadFile method
    return this.client.uploadFile({
      key: uploadFilename,
      content: fileContent,
      ...options,
    });
  }

  async list_tables(): Promise<ListTablesResponse> {
    return this.client.listTables({});
  }

  async insert_row(
    table_name: string,
    user_rows: object[],
    options: object = {},
  ): Promise<object> {
    return this.client.createTableRows({
      table: table_name,
      rows: user_rows,
      ...options,
    });
  }
}
