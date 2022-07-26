import Store from 'electron-store';

export type TProject = {
  name: string;
  namePinyin: string;
  path: string;
  pathPinyin: string;
  web?: {
    scripts: string[];
    types: string[];
  };
};

export type TWeight = {
  [path: string]: number;
};

export const store = new Store({
  defaults: {
    webProjects: [] as string[],
    projects: [] as TProject[],
    weights: {} as TWeight,
    terminal: 'Terminal.app',
  },
});
