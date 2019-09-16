import React from 'react';
import './App.css';
import AllEvents from './screens/AllEvents';
import MyEvents from './screens/myEvents';
import {Menu} from './components/Menu/menu';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App" style={{ backgroundColor: "#e6e6e6", minHeight: "750px"}} >
      <BrowserRouter>
        <div>
          <Menu />
          <Switch>
            <Route path="/" component={AllEvents} exact />
            <Route path="/allevents" component={AllEvents} exact />
            <Route path="/myevents" component={MyEvents} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
