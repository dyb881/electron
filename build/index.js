const { send, on } = window.electron;

send('page-ready');

// 注册添加按钮
const add = () => send('add');
const addIcon = document.getElementById('add-icon');
const addButton = document.getElementById('add-button');
addIcon.addEventListener('click', add);
addButton.addEventListener('click', add);

const search = document.getElementById('search');
const loading = document.getElementById('loading');
const projects = document.getElementById('projects');
const noProjects = document.getElementById('no-projects');
const types = [loading, projects, noProjects];
let current = noProjects;
let projectsData = [];
let searchText = '';

const show = (typeDom) => {
  if (typeDom !== loading) current = typeDom;
  for (let type of types) {
    type.style.display = type === typeDom ? 'flex' : 'none';
  }
};

const isShow = (item) => {
  if (!searchText) return true;
  const regExp = new RegExp(searchText);
  return (
    regExp.test(item.name) || regExp.test(item.path) || regExp.test(item.namePinyin) || regExp.test(item.pathPinyin)
  );
};

const showProjects = async () => {
  if (!projectsData.length) return show(noProjects);
  if (current === projects) {
    projects.classList.remove('animation');
    const frag = document.createDocumentFragment();
    for (let item of projectsData) {
      if (!isShow(item)) continue;
      const project = createProject(item);
      frag.appendChild(project);
    }
    projects.innerHTML = '';
    projects.appendChild(frag);
  } else {
    projects.classList.add('animation');
    projects.innerHTML = '';
    show(projects);
    for await (let item of projectsData) {
      if (!isShow(item)) continue;
      const project = createProject(item);
      projects.appendChild(project);
      await new Promise((r) => setTimeout(r, 100));
    }
  }
};

show(current);

on('loading', (event, arg) => {
  show(arg ? loading : current);
});

on('show-projects', (event, arg) => {
  projectsData = arg;
  showProjects();
});

on('input-focus', (event, arg) => {
  searchText = '';
  search.value = '';
  search.focus();
  showProjects();
});

const createProject = (data) => {
  const project = document.createElement('div');
  project.classList.add('project');

  const actions = [];

  // if (data.web) {
  actions.push(
    `<img src="terminal-line.svg" alt="" data-type="terminal" data-path="${data.path}" />`,
    `<img src="code-s-slash-line.svg" alt="" data-type="code" data-path="${data.path}" />`
  );
  // }

  actions.push(`<img src="folder-line.svg" alt="" data-type="folder" data-path="${data.path}" />`);
  actions.push(`<img src="delete-bin-7-line.svg" alt="" data-type="delete" data-path="${data.path}" />`);

  project.innerHTML = `
    <div class="name">${data.name}</div>
    <div class="action">${actions.join('')}</div>
  `;
  return project;
};

projects.addEventListener('click', (e) => {
  const { type, path } = e.target.dataset;
  type && send(type, path);
});

search.addEventListener('input', (e) => {
  searchText = e.target.value;
  showProjects();
});
