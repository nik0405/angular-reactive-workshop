import { Action } from "@ngrx/store";

import { Project } from "../../projects/project.model";

export enum ProjectsActionTypes {
    ProjectSelected = "[Projects] Selected",
    LoadProjects = '[Projects] Load Data',
    ProjectsLoaded = "[Project] Data Loaded",

    AddProject = "[Projects] Add Data",
    ProjectAdded = "[Project] Data Added",

    UpdateProject = "[Projects] Udated Data",
    DeleteProject = "[Projects] Delete Data",
}


export class LoadProject implements Action {
    type:ProjectsActionTypes;
    constructor(){
        this.type = ProjectsActionTypes.LoadProjects
    }
}
export class ProjectLoaded implements Action {
    type:ProjectsActionTypes;
    constructor(public payload: Project[]){
        this.type = ProjectsActionTypes.ProjectsLoaded
    }
}

export class SelectProject implements Action {
    type: ProjectsActionTypes;
    constructor(private payload: Project){
        this.type = ProjectsActionTypes.ProjectSelected;
    }
}

export class AddProject implements Action {
    type: ProjectsActionTypes;
    constructor(public payload: Project){
        this.type = ProjectsActionTypes.AddProject;
    }
}
export class ProjectAdded implements Action {
    type: ProjectsActionTypes;
    constructor(public payload: Project){
        this.type = ProjectsActionTypes.ProjectAdded;
    }
}

export class UpdateProject implements Action {
    type: ProjectsActionTypes;
    constructor(private payload: Project){
        this.type = ProjectsActionTypes.UpdateProject;
    }
}
export class DeleteProject implements Action {
    type: ProjectsActionTypes;
    constructor(private payload: Project){
        this.type = ProjectsActionTypes.DeleteProject;
    }
}

export type ProjectsActions = SelectProject | LoadProject| ProjectLoaded |AddProject |ProjectAdded| UpdateProject | DeleteProject;