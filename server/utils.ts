export function identifyPlatform(url: string) {
  // Define a mapping of domain patterns to platform names
  const platformMap = {
    "www\\.instagram\\.com": "Instagram",
    "pin\\.it": "Pinterest",
    "pinterest\\.com": "Pinterest",
    "twitter\\.com": "Twitter",
    "x\\.com": "Twitter",
    "www\\.reddit\\.com": "Reddit",
  };
  for (const domainPattern in platformMap) {
    const regex = new RegExp(`\\b(?:${domainPattern})\\b`, "i");
    if (regex.test(url)) {
      return platformMap[domainPattern as keyof typeof platformMap];
    }
  }
  return null;
}
