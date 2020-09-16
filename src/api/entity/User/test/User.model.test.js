import { hash, compare } from "bcryptjs";

describe("Password compare", () => {
  test("Compare", async () => {
    const passHash = await hash("test1234", 12);

    //"$2a$12$x4FMT1MPodKmxVwoirkAJOjxUtY5/cITHSKEXzkv4PsUgW5jG/9ia"
    const result = await compare(
      "test1234",
      "$2a$12$eSVqxXYlmv1HzEDUqMQrZ.9t5tuH2GY9T69wYS3WxgohimBZUq3Im"
    );

    expect(result).toEqual(true);
  });
});
