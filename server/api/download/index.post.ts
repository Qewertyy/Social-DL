import { useValidatedQuery, z } from "h3-zod";
import { download } from "~/server/downloader";

export default eventHandler(async (event) => {
  const { platform, url } = await useValidatedQuery(event, {
    platform: z.string(),
    url: z.string(),
  });
  const data = await download(platform, url);
  if (!data) {
    return Response.json({ error: "Failed to download" }, { status: 500 });
  }
  return Response.json(data);
});