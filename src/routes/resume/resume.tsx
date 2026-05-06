import { PropsOf, type JSXChildren } from '@builder.io/qwik';
import type { ResumeData } from './hooks/use-resume-store';
import { EducationItemData, ExperienceItemData, LanguageAc, LanguageLevel } from './hooks/use-resume-store/types';
import { MarkdownSpan } from './common/markdown-span';
import { DocMeta } from './common/doc-meta';
import { MaybeLink } from './common/maybe-link';
import { Pin } from './icons/pin';
import { Email } from './icons/email';
import { Star } from './icons/star';
import { Github } from './icons/github';
import { Linkedin } from './icons/linkedin';
import { match } from '@onwo/primitives';

type HeadLinkProps = { hint?: string; icon: JSXChildren; children: JSXChildren; href?: string; };
const HeadLink = ({ hint, icon, children, href }: HeadLinkProps) => (
  <MaybeLink class="flex gap-2 items-center text-sm text-ink-secondary" href={href}>
    {!!hint && <DocMeta d={hint} />}
    <span>{icon}</span>
    <span>{children}</span>
  </MaybeLink>
);

type ResumeHeadProps = { head: ResumeData['head']; }
const ResumeHead = ({ head: { lastname, firstname, jobTitle, links } }: ResumeHeadProps) => (
  <div class="pt-10 pb-4">
    <div class="flex flex-col text-2xl font-semibold -tracking-[0.01em]">
      <h1>{firstname} {lastname}</h1>
      <p class="text-ink-secondary">{jobTitle}</p>
    </div>
    <div class="mt-10 flex gap-12">
      {!!links.location && <HeadLink hint="Location" icon={<Pin size="xs" />}>{links.location}</HeadLink>}
      {!!links.email && <HeadLink hint="Email:" icon={<Email size="xs" />} href={`mailto:${links.email}`}>{links.email}</HeadLink>}
      {!!links.portfolio && <HeadLink hint="Blog/portfolio:" icon={<Star size="xs" />} href={links.portfolio.link}>{links.portfolio.label}</HeadLink>}
      {!!links.github && <HeadLink hint="Github:" icon={<Github size="xs" />} href={links.github.link}>{links.github.label}</HeadLink>}
      {!!links.linkedin && <HeadLink hint="Linkedin:" icon={<Linkedin class="text-ink-primary" size="xs" />} href={links.linkedin.link}>{links.linkedin.label}</HeadLink>}
    </div>
  </div>
)

type ResumeAboutMeProps = { aboutData: ResumeData['about'] } & PropsOf<'div'>
const ResumeAboutMe = ({ aboutData, class: className, ...props }: ResumeAboutMeProps) => (
  <div class={["relative flex flex-col gap-4", className]} {...props}>
    <DocMeta d="test metadada" />
    <p class="font-medium">
      <MarkdownSpan text={aboutData.intro} />
    </p>
    <p class="font-medium leading-[1.8] text-xs tracking-wide text-ink-secondary">
      <MarkdownSpan text={aboutData.details} />
    </p>
  </div>
);

type WorkExperienceProps = { experience: ExperienceItemData } & PropsOf<'div'>;
const WorkExperience = ({ experience, class: className, ...props }: WorkExperienceProps) => (
  <div class={['flex flex-col gap-1', className]} {...props}>
    <h3 class="font-medium leading-[1]">
      <DocMeta d="Job title:" />
      {experience.title}
    </h3>
    <MaybeLink class="flex items-center gap-1 text-ink-secondary font-medium text-sm" href={experience.companyLink}>
      <DocMeta d="Company:" />
      <span>{experience.company}</span>
      {!!experience.companyLogo && <img class="h-[12px]" src={experience.companyLogo} />}
    </MaybeLink>
    <p class="flex gap-1 font-medium text-ink-secondary text-xs leading-[1] mb-1 tracking-wide">
      <DocMeta d="Location:" />
      <span>{experience.place}</span>
      <span>|</span>
      <DocMeta d="Period:" />
      <span>{experience.date}</span>
    </p>

    <DocMeta d={`Skills: ${experience.skills.reduce((acc, next) => `${acc}, ${next}`, '')}`} />
    <div class="flex flex-col gap-2 text-ink-secondary text-xs tracking-wide mt-1">
      {experience.bullets.filter(b => b.trim() !== '').map((bullet, idx) => (
        <div class="flex gap-1" key={idx}>
          <span class="text-lg leading-[0.74]">•</span>
          <MarkdownSpan text={bullet} />
        </div>
      ))}
    </div>

    <div class="flex gap-1 text-xs tracking-wide mt-1">
      {experience.skills.map((bullet, idx) => (
        <div class="text-ink-secondary font-medium px-1 bg-base-secondary rounded-md flex gap-1" key={idx}>
          <MarkdownSpan text={bullet} />
        </div>
      ))}
    </div>
    <DocMeta d={`Skills: ${experience.skills.reduce((acc, next) => `${acc}, ${next}`, '')}`} />
  </div>
);

type SectionTitleProps = { title: string, size?: 'sm' | 'md' };
const SectionTitle = ({ title, size }: SectionTitleProps) => (
  <div class="flex items-center gap-2">
    <div class={["h-px bg-separator-primary", size === 'sm' ? 'w-3' : 'w-4']} />
    <h3 class="font-medium">{title}</h3>
  </div>
)


type ResumeExperiencesProps = { experiences: ResumeData['experiences'] } & PropsOf<'div'>;
const ResumeExperiences = ({ experiences, class: className, ...props }: ResumeExperiencesProps) => (
  <div class={["flex flex-col", className]} {...props}>
    <SectionTitle title="Experience" />
    <div class="flex flex-col ml-6 mt-4 gap-8">
      {experiences.map((experience, idx) => <div>
        <DocMeta d={`Experience n${idx + 1}`} />
        <WorkExperience experience={experience} />
      </div>)}
    </div>
  </div>
);

type ResumeEducationItemProps = { education: EducationItemData };
const ResumeEducationItem = ({ education }: ResumeEducationItemProps) => (
  <div class="flex flex-col">
    <DocMeta d={`University name:`} />
    <div class="flex items-center gap-1">
      <h4 class="text-sm tracking-wide font-semibold">{education.school}</h4>
      {!!education.schoolLogo && <img class="h-[12px]" src={education.schoolLogo} />}
    </div>
    {!!education.degree && <>
      <DocMeta d={`Degree:`} />
      <p class="font-medium text-sm tracking-wide text-ink-secondary">{education.degree}</p>
    </>}
    <div class="flex leading-[1.6] items-center font-medium gap-1 text-xs tracking-wide text-ink-secondary">
      <DocMeta d={`Location:`} />
      <p>{education.place}</p>
      <p>|</p>
      <DocMeta d={`Date:`} />
      <p>{education.date}</p>
    </div>
  </div>
);

type ResumeEducationProps = { educations: ResumeData['education'] }
const ResumeEducation = ({ educations }: ResumeEducationProps) => (
  <div>
    <SectionTitle size="sm" title="Education" />
    <div class="flex flex-col gap-4 mt-2 ml-5">
      {educations.map((education, idx) => (
        <div>
          <DocMeta d={`School n${idx + 1}`} />
          <ResumeEducationItem education={education} />
        </div>
      ))}
    </div>
  </div>
);

type ResumeSoftwareProps = { software: ResumeData['software'] } & PropsOf<'div'>
const ResumeSoftware = ({ software, ...props }: ResumeSoftwareProps) => (
  <div {...props}>
    <SectionTitle size="sm" title={software.sectionName} />
    <div class="flex flex-col gap-2 mt-2 ml-5">
      {software.items.map((software) => (
        <div class="flex gap-2 items-center ">
          <img class="h-3 w-3" src={"/resume/icons/" + software.icon + '.svg'} />
          <p class="text-ink-secondary text-sm font-medium">{software.name}</p>
        </div>
      ))}
    </div>
  </div>
);

type ResumeSkillsProps = { skills: ResumeData['skills'] } & PropsOf<'div'>
const ResumeSkills = ({ skills, ...props }: ResumeSkillsProps) => (
  <div {...props}>
    <SectionTitle size="sm" title="Skills" />
    <div class="grid grid-cols-2 gap-1 mt-2 ml-5">
      {skills.map((skill) => (
        <p class="text-xs text-ink-secondary font-medium">{skill}</p>
      ))}
    </div>
  </div>
);

const getLanguageNameFromAC = (ac: LanguageAc) => match(ac, {
  FR: () => 'Francais',
  EN: () => 'English',
});

const getLanguageLevel = (level: LanguageLevel) => match(level, {
  native: () => 'Natif',
  professional: () => 'Professionel',
  advanced: () => 'Avance',
  intermediate: () => 'Intermediaire',
  beginner: () => 'Debutant'
});

type ResumeOthersProps = { languages: ResumeData['languages'] } & PropsOf<'div'>
const ResumeOthers = ({ languages, ...props }: ResumeOthersProps) => (
  <div {...props}>
    <SectionTitle size="sm" title="Autre" />
    <div class="flex flex-col gap-2 mt-2 ml-5">
      {languages.map((language) => (
        <div class="flex gap-2 items-center">
          <img class="w-3 h-3" src={'/resume/country-icons/' + language.ac + '.svg'} />
          <p class=" flex gap-1 text-xs font-medium text-ink-secondary">
            <span>{getLanguageNameFromAC(language.ac)}</span>
            <span>-</span>
            <span>{getLanguageLevel(language.level)}</span></p>
        </div>
      ))}
    </div>
  </div>
);

type ResumeProps = { resume: ResumeData; }
export const Resume = ({ resume }: ResumeProps) => (
  <div class="resume px-10 bg-base-primary text-ink-primary border-separator-primary" style={{ "font-family": '"SF Pro Display" !important' }}>
    <ResumeHead head={resume.head} />
    <hr class="mb-6" />
    <div class="flex gap-10 justify-between">
      {/* Left section */}
      <div class="flex flex-col gap-6">
        <ResumeAboutMe aboutData={resume.about} />
        <ResumeExperiences experiences={resume.experiences} />
      </div>
      {/* Right section */}
      <div class="shrink-0 w-[243px]">
        <ResumeEducation educations={resume.education} />
        <ResumeSoftware class="mt-8" software={resume.software} />
        <ResumeSkills class="mt-8" skills={resume.skills} />
        <ResumeOthers class="mt-8" languages={resume.languages} />
      </div>
    </div>
  </div>
);
