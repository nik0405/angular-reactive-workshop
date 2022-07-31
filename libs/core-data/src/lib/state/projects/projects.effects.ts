import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { AddProject } from '@workshop/core-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './../../projects/project.model';
import { ProjectsService } from './../../projects/projects.service';
import { LoadProject, ProjectAdded, ProjectLoaded, ProjectsActionTypes } from './projects.actions';
import { ProjectState } from './projects.reducer';
  
@Injectable({providedIn: 'root'})
export class ProjectsEffects {
@Effect() loadProjects$ = 
    this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects , 
    {
        run: (action: LoadProject , state: ProjectState) =>{ 
            return this.projectsService.all()
                .pipe(map((res:Project[]) => {new ProjectLoaded(res)}))
        },
        onError: (action: LoadProject, error) => {
            console.error('Error', error);
          }
    });

@Effect() addProjects$ = 
    this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.AddProject , 
    {
        run: (action: AddProject , state: ProjectState) =>{ 
            return this.projectsService.create(action.payload)
                .pipe(map((res:Project) => {new ProjectAdded(res)}))
        },
        onError: (action: AddProject, error) => {
            console.error('Error', error);
          }
    })


  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectState>,
    private projectsService: ProjectsService
  ) {}
}