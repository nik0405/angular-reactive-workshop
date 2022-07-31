import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectState, AddProject, UpdateProject,LoadProject, DeleteProject } from '@workshop/core-data';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { initialProjects } from 'libs/core-data/src/lib/state/projects/projects.reducer';
import { selectAllProject } from 'libs/core-data/src/lib/state';


const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectState>,
    private ns: NotificationsService) { 
      this.projects$ = store.pipe(select(selectAllProject));
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    //this.projects$ = this.projectsService.all();
    this.store.dispatch(new LoadProject())
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    // this.projectsService.create(project)
    //   .subscribe(response => {
    //     this.ns.emit('Project created!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   });
    this.store.dispatch(new AddProject(project));

    //This will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();

  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    //This will go away
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
    // this.projectsService.update(project)
    //   .subscribe(response => {
    //     this.ns.emit('Project saved!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   });
  }

  deleteProject(project) {
    console.log(new DeleteProject(project))
    this.store.dispatch(new DeleteProject(project));

    //This will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();

    // this.projectsService.delete(project)
    //   .subscribe(response => {
    //     this.ns.emit('Project deleted!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   });
  }
}

