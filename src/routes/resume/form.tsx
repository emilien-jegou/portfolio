import { component$, useStore, Slot, type PropFunction } from "@builder.io/qwik";
import type { ResumeData } from "./hooks/use-resume-store";

type DrawerProps = {
  title: string;
  showBack?: boolean;
  onBack$?: PropFunction<() => void>;
};

export const Drawer = component$<DrawerProps>(({ title, showBack, onBack$ }) => {
  return (
    <div class="w-[420px] bg-white border-l border-gray-300 shadow-2xl flex flex-col h-full z-10 flex-shrink-0 print:hidden">
      <div class="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 class="font-bold text-lg text-blue-600">{title}</h2>
        </div>
        {showBack && (
          <button
            class="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-sm px-3 py-1.5 rounded transition"
            onClick$={onBack$}
          >
            ← Back
          </button>
        )}
      </div>
      <div class="flex-1 overflow-auto p-4 flex flex-col gap-6">
        <Slot />
      </div>
    </div>
  );
});

export const Section = component$(({ title, class: className }: { title: string; class?: string }) => (
  <section class={["flex flex-col gap-3", className]}>
    <h3 class="font-bold text-sm border-b pb-1">{title}</h3>
    <Slot />
  </section>
));

type FieldInputProps = {
  label: string;
  value: string;
  onInput$: PropFunction<(val: string) => void>;
  colSpan?: boolean;
};

export const FieldInput = component$<FieldInputProps>(({ label, value, onInput$, colSpan }) => (
  <div class={["flex flex-col gap-1", colSpan ? "col-span-2" : ""]}>
    <label class="text-[10px] font-bold text-gray-500 uppercase">{label}</label>
    <input
      class="border border-gray-300 rounded p-1.5 text-sm"
      value={value}
      onInput$={(_, el) => onInput$(el.value)}
    />
  </div>
));

type FieldTextareaProps = {
  label: string;
  value: string;
  onInput$: PropFunction<(val: string) => void>;
  height?: string;
  mono?: boolean;
};

export const FieldTextarea = component$<FieldTextareaProps>(({ label, value, onInput$, height = "h-16", mono }) => (
  <div class="flex flex-col gap-1">
    <label class="text-[10px] font-bold text-gray-500 uppercase">{label}</label>
    <textarea
      class={["border border-gray-300 rounded p-1.5 text-sm resize-none", height, mono ? "whitespace-pre font-mono" : ""]}
      value={value}
      onInput$={(_, el) => onInput$(el.value)}
    />
  </div>
));

type ListItemCardProps = {
  title: string;
  subtitle?: string;
  onEdit$: PropFunction<() => void>;
  onDel$: PropFunction<() => void>;
};

export const ListItemCard = component$<ListItemCardProps>(({ title, subtitle, onEdit$, onDel$ }) => (
  <div class="p-2 border border-gray-200 rounded bg-gray-50 flex items-center justify-between gap-2 shadow-sm">
    <div class="flex-1 truncate text-sm">
      <span class="font-bold">{title}</span>
      {subtitle && <span class="text-xs text-gray-500"> {subtitle}</span>}
    </div>
    <button class="text-blue-600 font-bold text-xs px-2 hover:underline" onClick$={onEdit$}>Edit</button>
    <button class="text-red-600 font-bold text-xs px-2 hover:underline" onClick$={onDel$}>Del</button>
  </div>
));

type AddButtonProps = {
  label: string;
  onClick$: PropFunction<() => void>;
};

export const AddButton = component$<AddButtonProps>(({ label, onClick$ }) => (
  <button
    class="bg-blue-50 text-blue-600 font-bold border border-blue-200 text-sm py-1.5 rounded hover:bg-blue-100 transition"
    onClick$={onClick$}
  >
    {label}
  </button>
));


// ============================================================================
// MAIN RESUME EDITION FORM COMPONENT
// ============================================================================

type ResumeEditionFormProps = {
  data: ResumeData;
};

export const ResumeEditionForm = component$(({ data }: ResumeEditionFormProps) => {
  const ui = useStore({
    view: 'main' as 'main' | 'experience' | 'education',
    editIndex: -1
  });

  return (
    <Drawer
      title="Editor Panel"
      showBack={ui.view !== 'main'}
      onBack$={() => ui.view = 'main'}
    >

      {/* ---- MAIN MENU VIEW ---- */}
      {ui.view === 'main' && (
        <>
          <Section title="Personal Info">
            <div class="grid grid-cols-2 gap-2">
              <FieldInput label="First Name" value={data.head.firstname} onInput$={(val) => data.head.firstname = val} />
              <FieldInput label="Last Name" value={data.head.lastname} onInput$={(val) => data.head.lastname = val} />
              <FieldInput label="Job Title" value={data.head.jobTitle} onInput$={(val) => data.head.jobTitle = val} colSpan />
            </div>
          </Section>

          <Section title="Links & Contact">
            <div class="grid grid-cols-2 gap-2">
              <FieldInput label="Email" value={data.head.links.email || ''} onInput$={(val) => data.head.links.email = val} />
              <FieldInput label="Location" value={data.head.links.location || ''} onInput$={(val) => data.head.links.location = val} />

              <FieldInput label="Portfolio URL" colSpan value={typeof data.head.links.portfolio === 'object' ? data.head.links.portfolio?.link : (data.head.links.portfolio || '')}
                onInput$={(val) => {
                  if (typeof data.head.links.portfolio === 'object' && data.head.links.portfolio !== null) data.head.links.portfolio.link = val;
                  else data.head.links.portfolio = { link: val, label: val };
                }} />

              <FieldInput label="GitHub URL" colSpan value={typeof data.head.links.github === 'object' ? data.head.links.github?.link : (data.head.links.github || '')}
                onInput$={(val) => {
                  if (typeof data.head.links.github === 'object' && data.head.links.github !== null) data.head.links.github.link = val;
                  else data.head.links.github = { link: val, label: val };
                }} />

              <FieldInput label="LinkedIn URL" colSpan value={typeof data.head.links.linkedin === 'object' ? data.head.links.linkedin?.link : (data.head.links.linkedin || '')}
                onInput$={(val) => {
                  if (typeof data.head.links.linkedin === 'object' && data.head.links.linkedin !== null) data.head.links.linkedin.link = val;
                  else data.head.links.linkedin = { link: val, label: val };
                }} />
            </div>
          </Section>

          <Section title="About Me">
            <FieldTextarea label="Short Tagline" height="h-12" value={data.about.intro} onInput$={(val) => data.about.intro = val} />
            <FieldTextarea label="Detailed Description" height="h-24" value={data.about.details} onInput$={(val) => data.about.details = val} />
          </Section>

          <Section title="Skills & Technologies">
            <FieldTextarea label="Comma Separated Skills" height="h-16" value={data.skills.join(', ')} onInput$={(val) => data.skills = val.split(',').map(s => s.trimStart())} />
          </Section>

          <Section title="Work Experiences">
            <div class="flex flex-col gap-2">
              {data.experiences.map((exp, idx) => (
                <ListItemCard
                  key={idx}
                  title={exp.title}
                  subtitle={`at ${exp.company}`}
                  onEdit$={() => { ui.editIndex = idx; ui.view = 'experience'; }}
                  onDel$={() => data.experiences.splice(idx, 1)}
                />
              ))}
              <AddButton label="+ Add Experience" onClick$={() => {
                data.experiences.push({
                  title: 'New Job Title',
                  company: 'Company',
                  place: 'Location',
                  date: 'Date Range',
                  bullets: [],
                  skills: []
                });
                ui.editIndex = data.experiences.length - 1;
                ui.view = 'experience';
              }} />
            </div>
          </Section>

          <Section title="Education" class="pb-8">
            <div class="flex flex-col gap-2">
              {data.education.map((edu, idx) => (
                <ListItemCard
                  key={idx}
                  title={edu.school}
                  onEdit$={() => { ui.editIndex = idx; ui.view = 'education'; }}
                  onDel$={() => data.education.splice(idx, 1)}
                />
              ))}
              <AddButton label="+ Add Education" onClick$={() => {
                data.education.push({ school: 'New School', place: 'Location', degree: 'Degree', date: 'Date Range' });
                ui.editIndex = data.education.length - 1;
                ui.view = 'education';
              }} />
            </div>
          </Section>
        </>
      )}

      {/* ---- SUB FORMS ---- */}

      {/* WORK EXPERIENCE FORM */}
      {ui.view === 'experience' && data.experiences[ui.editIndex] && (() => {
        const item = data.experiences[ui.editIndex];
        return (
          <div class="flex flex-col gap-3">
            <FieldInput label="Job Title" value={item.title} onInput$={(val) => item.title = val} />
            <FieldInput label="Company" value={item.company} onInput$={(val) => item.company = val} />
            <div class="grid grid-cols-2 gap-2">
              <FieldInput label="Location" value={item.place} onInput$={(val) => item.place = val} />
              <FieldInput label="Duration" value={item.date} onInput$={(val) => item.date = val} />
            </div>
            <FieldTextarea
              label="Bullets (One per line, supports markdown)"
              height="h-56"
              mono
              value={item.bullets.join('\n')}
              onInput$={(val) => item.bullets = val.split('\n')}
            />
          </div>
        );
      })()}

      {/* EDUCATION FORM */}
      {ui.view === 'education' && data.education[ui.editIndex] && (() => {
        const item = data.education[ui.editIndex];
        return (
          <div class="flex flex-col gap-3">
            <FieldInput label="School / University" value={item.school} onInput$={(val) => item.school = val} />
            <FieldInput label="Degree" value={item.degree ?? ''} onInput$={(val) => {
              let trimmed = val.trim();
              if (trimmed.length) {
                item.degree = val
              } else {
                item.degree = undefined
              }
            }} />
            <div class="grid grid-cols-2 gap-2">
              <FieldInput label="Location" value={item.place} onInput$={(val) => item.place = val} />
              <FieldInput label="Duration" value={item.date} onInput$={(val) => item.date = val} />
            </div>
          </div>
        );
      })()}

    </Drawer>
  );
});
