import { $, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { z } from '@builder.io/qwik-city';
import { createPersistentStore } from '~/hooks/use-persistent-store';
import { ResumeData, ResumeDataSchema } from './types';
import { DEFAULT_DATA } from './data';

const APP_STATE_ID = 1;

const _useAppStatePersistentStore = createPersistentStore(
  $(() =>
    z.object({
      id: z.number(),
      resumes: z.array(z.object({ id: z.string(), name: z.string() })),
      activeId: z.string(),
    }),
  ),
  { dbName: 'use-resume-db', storeName: 'appState', keyPath: 'id', version: 1 },
);

type AppStateData = {
  resumes: { id: string; name: string }[];
  activeId: string;
};

export const useAppStateStore = () => {
  const store = _useAppStatePersistentStore();
  const data = useStore({
    resumes: [{ id: 'default', name: 'My First Resume' }],
    activeId: 'default',
    menuOpen: false, // Local transient UI state, isolated from DB saves
  }, { deep: true });

  useVisibleTask$(async () => {
    const exit = await store.getItem$(APP_STATE_ID);
    if (exit._tag === 'Success' && exit.value) {
      data.resumes = exit.value.resumes;
      data.activeId = exit.value.activeId;
    }
  }, { strategy: 'document-ready' });

  const upsert = $(async (updater: (current: AppStateData) => AppStateData) => {
    const exit = await store.updateItem$(APP_STATE_ID, $(async (current) => {
      const base = current ?? { resumes: data.resumes, activeId: data.activeId };
      const updated = updater(base);
      return { ...updated, id: APP_STATE_ID }; // Guarantee schema id constraint
    }));

    // Re-sync validated update output to UI store
    if (exit._tag === 'Success' && exit.value) {
      data.resumes = exit.value.resumes;
      data.activeId = exit.value.activeId;
    }
  });

  return { data, upsert };
};

const _useResumePersistentStore = createPersistentStore(
  $(() => ResumeDataSchema.extend({ id: z.string() })),
  { dbName: 'use-resume-persistent-store', storeName: 'resumes', keyPath: 'id', version: 1 },
);

export const useResumeStore = (resumeId: string) => {
  const store = _useResumePersistentStore();
  const data = useStore<ResumeData>(structuredClone(DEFAULT_DATA), { deep: true });

  useVisibleTask$(async ({ track }) => {
    track(() => resumeId);
    const exit = await store.getItem$(resumeId);
    if (exit._tag === 'Success' && exit.value) {
      Object.assign(data, exit.value);
    } else {
      Object.assign(data, structuredClone(DEFAULT_DATA));
    }
  }, { strategy: 'document-ready' });

  const upsert = $(async (updater: (current: ResumeData) => ResumeData) => {
    const exit = await store.updateItem$(resumeId, $(async (current) => {
      const base = current ?? { ...structuredClone(DEFAULT_DATA), id: resumeId };
      const updated = updater(base);
      return { ...updated, id: resumeId };
    }));

    if (exit._tag === 'Success' && exit.value) {
      Object.assign(data, exit.value);
    }
  });

  const clear = $(async () => {
    Object.assign(data, structuredClone(DEFAULT_DATA));
    await store.deleteItem$(resumeId);
  });

  return { data, upsert, clear };
};

export type { ResumeData };
