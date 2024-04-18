import { useValidatedQuery, z } from "h3-zod";
import { download } from "~/server/utils/downloader";

export default eventHandler(async (event) => {
  const { platform, url } = await useValidatedQuery(event, {
    platform: z.string(),
    url: z.string(),
  });
  const data = await download(platform, url);

  return JSON.stringify(data);
});