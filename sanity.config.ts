"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: process.env.SANITY_STUDIO_BASE_PATH || "/studio",
  projectId,
  dataset,
  apiVersion,
  title: "Australia Trip Planner",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
