import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "s5tajbc49m7dcnbta55bn4m3",
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
});
