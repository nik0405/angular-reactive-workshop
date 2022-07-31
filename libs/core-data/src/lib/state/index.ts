import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';

//Update the shape of the entire application state
export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectState
}

//Add in the feature reducer into combined reducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};


// -------------------------------------------------------------------
// PROJECT SELECTORS - Selectetos to diret interact with
// -------------------------------------------------------------------

export const selectProjectState = createFeatureSelector<fromProjects.ProjectState>('projects');

export const selectProjectIds = createSelector(
  selectProjectState ,
  fromProjects.selectProjectIds
)

export const selectProjectEntities = createSelector(
  selectProjectState,
  fromProjects.selectProjectEntities
)

export const selectAllProject= createSelector(
  selectProjectState,
  fromProjects.selectAllProjects
)

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);


