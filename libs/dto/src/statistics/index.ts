import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const statisticsSchema = z.object({
  views: z.number().int().default(0),
  downloads: z.number().int().default(0),
  sectionTimes: z.record(z.string(), z.number()).optional(),
  locations: z.record(z.string(), z.number()).optional(),
});

export class StatisticsDto extends createZodDto(statisticsSchema) {}

export const updateStatisticsSchema = z.object({
  sectionTimes: z.record(z.string(), z.number()).optional(),
  location: z.string().optional(),
});

export class UpdateStatisticsDto extends createZodDto(updateStatisticsSchema) {}
