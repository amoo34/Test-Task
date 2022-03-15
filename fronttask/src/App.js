import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import ViewTask from "./modules/tasks/pages/ViewTask";
import BulkDelete from "./modules/tasks/pages/BulkDeleteTask";
import CreateTask from "./modules/tasks/pages/CreateTask";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/list-tasks">
          <ViewTask />
        </Route>
        <Route exact path="/create-task">
          <CreateTask />
        </Route>
        <Route exact path="/bulk-delete">
          <BulkDelete />
        </Route>
        <Route exact path="/">
          <Redirect to="/list-tasks" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
