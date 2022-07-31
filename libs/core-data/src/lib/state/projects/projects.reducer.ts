import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 Define shape of my state

export interface ProjectState extends EntityState<Project>{
  selectedProjectId : string | null;
}

//02 Create entity adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

//03 Define the inital state

export const initialState : ProjectState = adapter.getInitialState({
  selectedProjectId: null
})

// export const initialState: ProjectState =  {
//   projects : initialProjects,
//   selectedProjectId : null
// }

//03 Build the MOST simplest reducer
export function projectsReducers(state = initialState , action) : ProjectState {
  switch(action.type){
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({} , state, {selectedProjectId:action.payload})
    case ProjectsActionTypes.ProjectsLoaded:
      return adapter.addMany(action.payload , state);
    case ProjectsActionTypes.ProjectAdded:
      // Delegate stand alone function because it is testable
      return adapter.addOne(action.payload , state);
    case ProjectsActionTypes.UpdateProject:
        // Delegate stand alone function because it is testable
        return adapter.updateOne(action.payload , state);
    case ProjectsActionTypes.DeleteProject:
        // Delegate stand alone function because it is testable
        return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}

//Selectors - just function which take something and give something

export const getSelectedProjectId = (state:ProjectState) => state.selectedProjectId

const { selectIds, selectEntities,selectAll } = adapter.getSelectors();

export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;