import { JSXChildren, JSXNode } from "@builder.io/qwik";

import './styles.css';
import { LinkedinIcon } from "~/ui/icons/resume/linkedin";
import { EnvelopeIcon } from "~/ui/icons/resume/envelope";
import { GithubIcon } from "~/ui/icons/resume/github";
import { LinkChainIcon } from "~/ui/icons/resume/link-chain";
import { LinkOnIcon } from "~/ui/icons/resume/link-on";

import emjeIcon from '~/ui/media/resume/emje.png';
import epitechIcon from '~/ui/media/resume/epitech-filled.png';
import nthuIcon from '~/ui/media/resume/nthu.png';
import polyconseilIcon from '~/ui/media/resume/polyconseil.png';
import housematesIcon from '~/ui/media/resume/housemates.png';

type HeaderCategoryProps = {
  icon: JSXChildren;
  label: string;
  href: string;
};

const HeaderCategory = (props: HeaderCategoryProps) => (
  <a href={props.href} class="flex gap-1 text-sm font-bold items-center">
    <span>{props.icon}</span>
    <span>{props.label}</span>
  </a>
);

type HeaderDescProps = {
  label: string;
  content: string;
};

const HeaderDesc = (props: HeaderDescProps) => (
  <div class="text-xs w-full flex gap-0">
    <div class="w-[93px] shrink-0 relative py-[6px] mr-[12px] font-bold">
      <div class="font-bold w-px left-[100%] absolute shrink-0 top-0 h-[110%] border-l-[0.5px] border-[#C3C3BA]" />
      {props.label}
    </div>
    <div class="max-w-[900px]" >
      {props.content}
    </div>
  </div>
);


type SchoolEducationProps = {
  school: string;
  schoolIconSrc: string;
  location: string;
  diploma: string;
  from: string;
  to: string;
};

export const SchoolEducation = (props: SchoolEducationProps) => (
  <div class="flex gap-4 w-full items-center">
    <img height={36} width={36} src={props.schoolIconSrc} class="rounded-full" />
    <div class="w-full text-sm">
      <div class="w-full flex items-center justify-between">
        <h3 class="font-semibold">{props.school} - {props.location}</h3>
        <p class="text-gray-600 text-xs">
          {props.from} - {props.to}
        </p>
      </div>
      <p class="mt-1">{props.diploma}</p>
    </div>
  </div>
);

type AboutMeProps = {
  label: string;
  desc: string;
}

export const AboutMe = (props: AboutMeProps) => (
  <div class="text-sm">
    <h3 class="font-semibold">{props.label}</h3>
    <p class="mt-1">{props.desc}</p>
  </div>
);

type WorkExperienceProps = {
  jobTitle: string;
  company: string;
  companyIconSrc?: string;
  companyLink?: string;
  from: string;
  to: string;
  length: string;
  skills: string[],
  bullets: string[],
};


export const WorkExperience = (props: WorkExperienceProps) => {
  const Wrapper = ({ children }: { children: JSXChildren }) => props.companyLink ? <a href={props.companyLink} class="underline">{children}</a> : <span>{children}</span>;

  return (<div class="w-full text-sm">
    <div class="w-full flex items-center justify-between">
      <h3 class="font-semibold">{props.jobTitle}, <Wrapper>{props.company}</Wrapper> {props.companyIconSrc &&
        <img class="inline-block pl-1" width={24} height={24} src={props.companyIconSrc} />
      }</h3>
      <p class="text-gray-600 text-xs">
        {props.from} - {props.to} ({props.length})
      </p>
    </div>
    <div class="w-full gap-[6px] flex mt-2">
      {props.skills.map(skill => <div key={skill} class="text-xs rounded-full bg-gray-200 text-gray-700 font-medium px-2">{skill}</div>)}
    </div>
    <div class="w-full flex flex-col gap-1 mt-2">
      {props.bullets.map(bullet => <div key={bullet} class="flex gap-2">
        <div class="text-md">•</div>
        <p>{bullet}</p>
      </div>)}
    </div>
  </div>
  );
}

type SnippetProps = {
  label: string;
  linkLabel: string;
  link: string;
  desc: string;
};

export const Snippet = (props: SnippetProps) => (
  <div class="w-full text-sm">
    <p class="font-bold">{props.label} <a href={props.link}> <LinkOnIcon class="inline mx-1" /> {props.linkLabel}</a></p>
    <p class="mt-[1px]">{props.desc}</p>
  </div>
);

export default () => {
  return (
    <div class="font-dm pb-8 bg-white text-black">
      <div class="p-4" style={{ background: '#FCD51F' }}>
        <div class="px-2">
          <h1 class="text-xl font-bold">Emilien Jegou</h1>
          <div class="mt-3 flex gap-6">
            <HeaderCategory icon={<EnvelopeIcon />} label="emilien@emje.dev" href="mailto:emilien@emje.dev" />
            <HeaderCategory icon={<LinkedinIcon />} label="LinkedIn" href="https://www.linkedin.com/in/emilien-jegou/" />
            <HeaderCategory icon={<LinkChainIcon />} label="Blog" href="https://emje.dev/" />
            <HeaderCategory icon={<GithubIcon />} label="GitHub" href="https://github.com/emilien-jegou" />
          </div>
        </div>

        <div class="mt-4 flex flex-col bg-white rounded-2xl px-6 py-4">
          <HeaderDesc label="Current role" content="Full Stack Developer" />
          <HeaderDesc label="Technologies" content="TypeScript, Javascript, React, Node.js, Next.js, Postgres, Rust, Azure, Grafana, AWS, Serverless, Cypress, Selenium, RabbitMQ, Redis, Terraform, CI/CD, Agile, Kubernetes, Figma, C/C++, python" />
        </div>
      </div>
      <div class="mt-8 mx-12">
        <h2 class="text-xl font-bold mb-4"> Work experience </h2>
        <div class="flex flex-col gap-8">
          <WorkExperience
            jobTitle="Full Stack Developer"
            company="Self-employed"
            companyIconSrc={emjeIcon}
            companyLink="https://emje.dev"
            from="Sep 2023"
            to="Present"
            length="10m"
            skills={['Rust', 'TypeScript', 'Redis', 'Postgres', 'RabbitMQ', 'Grafana', 'Qwik.js']}
            bullets={[
              'Designed and developed an open-source time-tracker application for desktop and android, meant for project management and productivity tracking. The product includes a distributed storage library to allow automatic and conflict-free data replication across devices.',
              'Work on the development of a cloud platform for web scraping tailored for developers, built using a service oriented architecture with rabbitmq and redis for cross service communication.',
            ]}
          />
          <WorkExperience
            jobTitle="Full Stack Developer"
            company="Housemates"
            companyLink="https://housemates.io"
            companyIconSrc={housematesIcon}
            from="Nov 2022"
            to="Oct 2023"
            length="11m"
            skills={['Next.js', 'TypeScript', 'Sentry', 'PHP', 'Laravel', 'MySQL', 'Mixpanel']}
            bullets={[
              'Led the development of a global student accommodation platform and booking system, focusing on frontend refactor for safer programming practices, streamlined onboarding, and new integrations.',
              'Collaborated with the designer to redesign the marketplace and created the B2C marketing site from scratch.',
              'Enhanced Marketplace and B2B capabilities by implementing features such as internationalization, Property Management system integrations, property listings, and back-office improvements.',
              'Implemented data-driven solutions to improve user experience, including A/B testing, user behavior monitoring, GDPR-compliant cookie banner, and insights into user behaviors.',
              'Boosted SEO efforts by addressing indexing issues, improving rankings, and increasing Lighthouse performance scores by an average of 40% on both mobile and desktop platforms.'
            ]}
          />
          <WorkExperience
            jobTitle="Full Stack Developer"
            company="Polyconseil - Bolloré"
            companyLink="https://polyconseil.fr"
            companyIconSrc={polyconseilIcon}
            from="Apr 2021"
            to="Nov 2022"
            length="1y 7m"
            skills={['React', 'Node.js', 'Kubernetes', 'TypeScript', 'Postgres', 'Sentry', 'Azure', 'GraphQL', 'Grafana']}
            bullets={[
              `Developed a web platform from scratch for car park teleoperation, utilizing React and Nodejs, and initiated its integration across Indigo's French car park network, encompassing 600 locations; the platform is now being deployed and used internationally.`,
              'Coordinated with managers for quality assurance, technical requirement, user experience, and charge estimates. Gave explicit design of features in Figma and integrated them perfectly in code.',
              'Developed and maintained e2e/integration/unit tests on the frontend and backend as well as code quality tools, enforced proper programming practices through continuous integration jobs using gitlab CI.',
              'Worked extensively with Azure Cloud Services, IoT devices communication, Bi-directional web communication strategies, Data Lake automation, video proxying and stream transcoding.',
              'Interacted with Gitops tools for deployments, environment management, migrations, data transfer versioning and secure secret management.',
            ]}
          />
          <WorkExperience
            jobTitle="Full Stack Developer (internship)"
            company="Etude Segur"
            from="Mar 2019"
            to="Aug 2019"
            length="5m"
            skills={['React', 'Typescript', 'Node.js', 'Postgres', 'WebSocket']}
            bullets={[
              'Developed a web platform for genealogical data exploration using React and Express.js targeting in-house genealogists, featuring tree visualization, dynamic node editing, data import/export, and printable genealogical tree for specialized printers.',
              'Implemented various productivity tools to enhance collaboration within the French Segur network.',
              'Collaborated with genealogist on SEO campaign development and optimization.',
            ]}
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> Education </h2>
        <div class="flex flex-col gap-4">
          <SchoolEducation
            school="Epitech"
            schoolIconSrc={epitechIcon}
            location="Paris"
            diploma="Master In information Technology"
            from="Sep 2020"
            to="Sep 2021"
          />
          <SchoolEducation
            school="National Tsing Hua University"
            schoolIconSrc={nthuIcon}
            location="Taiwan"
            diploma="Exchange year in Computer Science Bsc"
            from="Sep 2019"
            to="Sep 2020"
          />
          <SchoolEducation
            school="Epitech"
            schoolIconSrc={epitechIcon}
            location="Rennes"
            diploma="Bachelor in Information Technology"
            from="Sep 2016"
            to="Sep 2019"
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> Snippets </h2>
        <div class="flex flex-col gap-4">
          <Snippet
            label="Personal blog"
            linkLabel="emje.dev"
            link="https://github.com/emilien-jegou"
            desc="I have a passion for discovering new things, which led me to create a blog where I share my programming interests. Built from scratch with the qwik.js framework and the Tailwind CSS library, this blog focuses on documenting fascinating open-source projects that often fly under the radar but truly deserve recognition!"
          />
          <Snippet
            label="o324"
            linkLabel="github.com"
            link="https://github.com/emilien-jegou/o324"
            desc="Started in March 2024, the o324 project is an open-source, cross-platform personal time tracking software. The application leverages the Rust Tauri library and the Qwik.js frontend framework. It features a dynamic storage backend that uses Git as the default storage system, which allow for trivial conflict resolution accross multiple device."
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> More about me </h2>
        <div class="flex w-full gap-6">
          <AboutMe label="Interests" desc="Cooking, travelling, nutrition, hiking" />
          <AboutMe label="Languages" desc="English (professional), French (native)" />
        </div>
      </div>
    </div>);
}
