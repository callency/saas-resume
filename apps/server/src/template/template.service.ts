import fs from "node:fs/promises";
import path from "node:path";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TemplateDto } from "@reactive-resume/dto";
import { templatesList } from "@reactive-resume/utils";

import type { Config } from "../config/schema";

@Injectable()
export class TemplateService {
  constructor(private readonly configService: ConfigService<Config>) {}

  async getCommunityTemplates(): Promise<TemplateDto[]> {
    const pluginDir = this.configService.get<string>("TEMPLATE_PLUGIN_DIR", "plugins/templates");
    try {
      const entries = await fs.readdir(pluginDir, { withFileTypes: true });
      const templates = [] as TemplateDto[];
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const manifestPath = path.join(pluginDir, entry.name, "template.json");
        try {
          const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8")) as TemplateDto;
          templates.push(manifest);
        } catch {
          // ignore malformed plugin
        }
      }
      return templates;
    } catch {
      return [];
    }
  }

  async getTemplates() {
    const community = await this.getCommunityTemplates();
    return { builtIn: templatesList, community };
  }
}
