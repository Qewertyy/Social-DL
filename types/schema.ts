import { z } from 'zod'

export const urlSchema = z.object({
  url: z.string().url("Invalid URL."),
});

export const mediaSchema = z.object({
  url: z.string(),
  type: z.string()
});

export type URLSchema = z.output<typeof urlSchema>;

export type MediaSchema = z.output<typeof mediaSchema>;

