import { test, expect, describe, beforeAll } from "bun:test";
import { BotpressClient, type BotpressClientConfig } from "../../src/modules";
import { get_config } from "../..";

describe("Botpress Client Module", () => {
  let client: BotpressClient;
  const { botpress_agent_config: config } = get_config();

  beforeAll(() => {
    client = new BotpressClient(config);
  });

  test("Create Client", () => {
    expect(client).not.toBeNull();
  });

  test("Get Bot", async () => {
    const bot = await client.get_bot();
    expect(bot).not.toBeNull();
  });

  //test("Get latest conversations of TELEGRAM", async () => {
  //  const result = await client.latest_conversations({
  //    sortField: "createdAt",
  //    sortDirection: "desc",
  //    integrationName: "instagram",
  //    limit: 1,
  //  });
  //  console.debug({ result });
  //  expect(result).toBeObject();
  //});

  test("Get files", async () => {
    const { files } = await client.get_files();
    console.debug({ files });
    expect(files).toBeArray();
  });
});
