import { combineReducers } from "@reduxjs/toolkit";
import { reducer as organizationsReducer } from "../../src/slices/organizations";
import { reducer as activitiesReducer } from "../../src/slices/activities";
import { reducer as usersReducer } from "../../src/slices/users";

const rootReducer = combineReducers({
  organizations: organizationsReducer,
  activities: activitiesReducer,
  users: usersReducer,
});

export default rootReducer;
