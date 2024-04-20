import { useValidatedQuery, z } from "h3-zod";
import { download } from "~/server/downloader";

export default eventHandler(async (event) => {
  const { platform, url } = await useValidatedQuery(event, {
    platform: z.string(),
    url: z.string().url(
      "not a valid url"
    ),
  });
  const response = await download(platform, url);
  return event.respondWith(response);
});