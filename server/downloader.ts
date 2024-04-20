export async function download(platform: string, url: string) {
  const response = await fetch(
    `https://lexica.qewertyy.dev/downloaders/${platform}?url=${url}`,
    {
      method: "POST",
    }
  );
  return await response.json();
};