-- Add analytics fields to Statistics
ALTER TABLE "Statistics" ADD COLUMN "sectionTimes" JSONB;
ALTER TABLE "Statistics" ADD COLUMN "locations" JSONB;
