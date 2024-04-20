import { useValidatedQuery, z } from "h3-zod";
import { download } from "~/server/downloader";

export default eventHandler(async (event) => {
  const { platform, url } = await useValidatedQuery(event, {
    platform: z.string(),
    url: z.string(),
  });
  const response = await download(platform, url);
  return response;
});