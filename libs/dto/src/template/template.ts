import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const templateInfoSchema = z.object({
  slug: z.string(),
  name: z.string(),
  author: z.string().optional(),
  description: z.string().optional(),
  preview: z.string().optional(),
});

export class TemplateDto extends createZodDto(templateInfoSchema) {}
