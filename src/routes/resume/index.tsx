import type { JSXChildren } from '@builder.io/qwik';

import './styles.css';

type HeaderCategoryProps = {
  icon: JSXChildren;
  label: string;
  href: string;
};

const HeaderCategory = (props: HeaderCategoryProps) => (
  <a href={props.href} class="flex gap-2 text-sm font-bold items-center">
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
    <div>{props.content}</div>
  </div>
);

type WorkExperienceProps = {
  jobTitle: string;
  company: string;
  companyLink?: string;
  from: string;
  to: string;
  length: string;
  skills: string[];
  bullets: string[];
};

type SchoolEducationProps = {
  school: string;
  location: string;
  diploma: string;
  from: string;
  to: string;
};

export const SchoolEducation = (props: SchoolEducationProps) => (
  <div class="w-full text-sm">
    <div class="w-full flex items-center justify-between">
      <h3 class="font-semibold">
        {props.school} - {props.location}
      </h3>
      <p class="text-gray-600 text-xs">
        {props.from} - {props.to}
      </p>
    </div>
    <p class="mt-1">{props.diploma}</p>
  </div>
);

type AboutMeProps = {
  label: string;
  desc: string;
};
export const AboutMe = (props: AboutMeProps) => (
  <div class="text-sm">
    <h3 class="font-semibold">{props.label}</h3>
    <p class="mt-1">{props.desc}</p>
  </div>
);

export const WorkExperience = (props: WorkExperienceProps) => (
  <div class="w-full text-sm">
    <div class="w-full flex items-center justify-between">
      <h3 class="font-semibold">
        {props.jobTitle},{' '}
        {props.companyLink ? (
          <a href={props.companyLink} class="underline">
            {props.company}
          </a>
        ) : (
          <span>{props.company}</span>
        )}
      </h3>
      <p class="text-gray-600 text-xs">
        {props.from} - {props.to} ({props.length})
      </p>
    </div>
    <div class="w-full gap-[6px] flex mt-2">
      {props.skills.map((skill, idx) => (
        <div key={idx} class="text-xs rounded-full bg-gray-200 text-gray-700 font-medium px-2">
          {skill}
        </div>
      ))}
    </div>
    <div class="w-full flex flex-col gap-1 mt-2">
      {props.bullets.map((bullet, idx) => (
        <div key={idx} class="flex gap-2">
          <div class="text-md">•</div>
          <p>{bullet}</p>
        </div>
      ))}
    </div>
  </div>
);

type SnippetProps = {
  label: string;
  linkLabel: string;
  link: string;
  desc: string;
};
export const Snippet = (props: SnippetProps) => (
  <div class="w-full text-sm">
    <p class="font-bold">
      {props.label} - <a href={props.link}>{props.linkLabel}</a>
    </p>
    <p class="mt-[1px]">{props.desc}</p>
  </div>
);

export default () => {
  return (
    <div class="font-body mb-8">
      <div class="p-4" style={{ background: '#FCD51F' }}>
        <h1 class="text-xl font-bold">Emilien Jegou</h1>
        <div class="mt-4 flex gap-4">
          <HeaderCategory icon={<>i</>} label="emilien@emje.dev" href="mailto:emilien@emje.dev" />
          <HeaderCategory
            icon={<>i</>}
            label="LinkedIn"
            href="https://www.linkedin.com/in/emilien-jegou/"
          />
          <HeaderCategory icon={<>i</>} label="Blog" href="https://emje.dev/" />
          <HeaderCategory icon={<>i</>} label="GitHub" href="https://github.com/emilien-jegou" />
        </div>

        <div class="mt-4 flex flex-col bg-paper rounded-2xl px-6 py-4">
          <HeaderDesc label="Current role" content="Full Stack Developer" />
          <HeaderDesc label="Experience" content="B2C, B2B" />
          <HeaderDesc
            label="Technologies"
            content="TypeScript, Redis, Postgres, Rust, RabbitMQ, Grafana, Sentry, Next.js, Laravel, Mixpanel, React, Kubernetes, Node.js, Azure, WebSocket"
          />
        </div>
      </div>
      <div class="mt-8 mx-12">
        <h2 class="text-xl font-bold mb-4"> Work experience </h2>
        <div class="flex flex-col gap-8">
          <WorkExperience
            jobTitle="Full Stack Developer"
            company="Self-employed"
            companyLink="https://emje.dev"
            from="Sep 2023"
            to="Present"
            length="10m"
            skills={[
              'Rust',
              'TypeScript',
              'Redis',
              'Postgres',
              'RabbitMQ',
              'Grafana',
              'Terraform',
              'Nomad',
            ]}
            bullets={[
              'Designed and developped an open-source time-tracker application for desktop and android, meant for project management and productivity tracking. The product includes a distributed storage library over Git to allow automatic and conflict-free data replication across devices, allowing seamless synchronization.',
              'Development of a cloud platform for web scraping tailored for developers, built using a service oriented architecture with rabbitmq and redis for cross service communication.',
            ]}
          />
          <WorkExperience
            jobTitle="Senior Full Stack Developer"
            company="Housemates"
            companyLink="https://housemates.io"
            from="Nov 2022"
            to="Oct 2023"
            length="11m"
            skills={['TypeScript', 'Sentry', 'Next.js', 'Laravel', 'MySQL', 'Mixpanel']}
            bullets={[
              'Led the development of a global student accommodation platform and booking system, focusing on frontend refactor for safer programming practices, streamlined onboarding, and new integrations.',
              'Collaborated with the designer to redesign the marketplace and created the B2C marketing site from scratch',
              'Enhanced Marketplace and B2B capabilities by implementing features such as internationalization, Property Management system integrations, property listings, and back-office improvements.',
              'Implemented data-driven solutions to improve user experience, including A/B testing, user behavior monitoring, GDPR-compliant cookie banner, and insights into user behaviors.',
              'Boosted SEO efforts by addressing indexing issues, improving rankings, and increasing Lighthouse performance scores by an average of 40% on both mobile and desktop platforms.',
            ]}
          />
          <WorkExperience
            jobTitle="Full Stack Developer"
            company="Polyconseil - Bolloré"
            companyLink="https://polyconseil.fr"
            from="Apr 2021"
            to="Nov 2022"
            length="1y 7m"
            skills={[
              'React',
              'Kubernetes',
              'TypeScript',
              'Node.js',
              'Postgres',
              'Sentry',
              'Azure',
              'Grafana',
            ]}
            bullets={[
              `Developed a web platform from scratch for car park teleoperation, utilizing React and Nodejs, and initiated its integration across Indigo's French car park network, encompassing 600 locations; the platform is now being deployed and used internationally`,
              'Coordinated with managers for quality assurance, technical requirement, user experience, and charge estimates. Gave explicit design of features in Figma and integrate them perfectly in code.',
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
              'Collaborated with genealogist on SEO campaign development and optimization',
            ]}
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> Education </h2>
        <div class="flex flex-col gap-6">
          <SchoolEducation
            school="Epitech"
            location="Paris"
            diploma="Master In information Technology"
            from="Sep 2020"
            to="Sep 2021"
          />
          <SchoolEducation
            school="National Tsing Hua University"
            location="Taiwan"
            diploma="Exchange year in Computer Science Bsc"
            from="Sep 2019"
            to="Sep 2020"
          />
          <SchoolEducation
            school="Epitech"
            location="Rennes"
            diploma="Bachelor in Information Technology"
            from="Sep 2016"
            to="Sep 2019"
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> Snippets </h2>
        <div class="flex flex-col gap-6">
          <Snippet
            label="Personal blog"
            linkLabel="emje.dev"
            link="https://github.com/emilien-jegou"
            desc="I love discovering new things, so I started a blog where I share my programming interests. The blog was developed from scratch using the qwik.js framework and the tailwind css library."
          />
          <Snippet
            label="o324"
            linkLabel="github.com"
            link="https://github.com/emilien-jegou/o324"
            desc="Started around march 2024, this project aims to provide an open-source cross-platform personal time tracking software that give the user the control of their data"
          />
        </div>
        <h2 class="mt-8 text-xl font-bold mb-4"> More about me </h2>
        <div class="flex w-full gap-6">
          <AboutMe
            label="Interests"
            desc="Cooking, travelling, nutrition, hiking, watching series"
          />
          <AboutMe label="Languages" desc="English (professional), French (native)" />
        </div>
      </div>
    </div>
  );
};
