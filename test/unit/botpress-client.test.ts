import { test, expect, describe, beforeAll } from "bun:test";
import { BotpressClient } from "../../src/modules";
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

  test("Upload file", async () => {
    const res = await client.upload_file(
      "/home/eleven/Downloads/cover-letter-sample-1(CVRESUME-IR)-1.pdf",
      "a1.xlsm",
      {
        tags: {
          category: "Sales",
          knowledgeBaseName: "Client Questions",
        },
      },
    );
    expect(res).toBeObject();
  });

  test("List tables", async () => {
    const { tables } = await client.list_tables();
    console.debug({ tables });
    expect(tables).toBeArray();
  });

  test("Add rows to table", async () => {
    const res = await client.insert_row("testTable", [
      { name: "Row 1", description: "This is row 1" },
      { name: "Row 2", description: "This is row 2" },
    ]);
    expect(res).toBeObject();
  });
});
