import { z } from "@builder.io/qwik-city";
import { IconDefs } from "./icons-defs";

export const LinkSchema = z.object({
  link: z.string().url().describe("URL"),
  label: z.string().describe("Display Label"),
});

export const HeadLinksSchema = z.object({
  location: z.string().optional().describe("Location"),
  email: z.string().email().optional().describe("Email Address"),
  portfolio: LinkSchema.optional().describe("Portfolio Link"),
  github: LinkSchema.optional().describe("GitHub Link"),
  linkedin: LinkSchema.optional().describe("LinkedIn Link"),
});

// --- SECTIONS ---
export const HeadDataSchema = z.object({
  firstname: z.string().describe("First Name"), // Kept your spelling, fixed label for UI
  lastname: z.string().describe("Last Name"),
  jobTitle: z.string().describe("Job Title"),
  links: HeadLinksSchema,
});

export const AboutDataSchema = z.object({
  intro: z.string()
    .describe('Short Description'),
  details: z.string()
    .describe("Detailed Description"),
});

export const ExperienceItemDataSchema = z.object({
  title: z.string().describe("Job Title"),
  company: z.string().describe("Company Name"),
  companyLogo: z.optional(z.string()).describe("Company Logo"),
  companyLink: z.optional(z.string().describe("Company Name")),
  place: z.string().describe("Location (e.g., France, Manchester - UK)"),
  date: z.string().describe("Duration (e.g., Sep 2023 - Current)"),
  skills: z.array(z.string()).default([]).describe("List of skills"),
  bullets: z.array(
    z.string().describe("Bullet Point (Markdown Supported)")
  ).describe("Responsibilities / Achievements"),
});

export type ExperienceItemData = z.infer<typeof ExperienceItemDataSchema>;

export const EducationItemDataSchema = z.object({
  school: z.string().describe("School / University Name"),
  schoolLogo: z.optional(z.string()).describe("School Logo"),
  degree: z.optional(z.string()).describe("Degree / Field of Study"),
  place: z.string().describe("Location (e.g., France, Manchester - UK)"),
  date: z.string().describe("Duration (e.g., Sep 2018 - Jun 2022)"),
});

export type EducationItemData = z.infer<typeof EducationItemDataSchema>;

export const SoftwareItemDataSchema = z.object({
  icon: IconDefs.describe('Any available icons'),
  name: z.string().describe('Name of the icon'),
});


const LanguageAcSchema = z.enum(['FR', 'EN']);
export type LanguageAc = z.infer<typeof LanguageAcSchema>;

const LanguageLevelSchema = z.enum(['native', 'professional', 'advanced', 'intermediate', 'beginner']);
export type LanguageLevel = z.infer<typeof LanguageLevelSchema>;


// --- MAIN DATA ROOT ---
export const ResumeDataSchema = z.object({
  head: HeadDataSchema.describe("Personal Information"),
  about: AboutDataSchema.describe("About Me"),
  experiences: z.array(ExperienceItemDataSchema).describe("Work Experience"),
  education: z.array(EducationItemDataSchema).describe("Education"),
  skills: z.array(z.string()).default([]).describe("Skills & Technologies"),
  software: z.object({
    sectionName: z.string().default('Software').describe('Name of the bloc, e.g. platform, languages, etc...'),
    items: z.array(SoftwareItemDataSchema)
  }).describe("Software knowledge"),
  languages: z.array(z.object({
    ac: LanguageAcSchema,
    level: LanguageLevelSchema,
    certification: z.optional(z.string()).describe('Certification e.g. B2')
  })),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
