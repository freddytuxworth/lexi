import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '../constants/routes.json';
import Home from '../components/Home';
import { set, get, getDataPath } from 'electron-json-storage';

export type Config = {
  showPronunciations: boolean,
  showDefinitions: boolean,
}

const defaultConfig: Config = {
  showPronunciations: true,
  showDefinitions: true,
};

export const ConfigContext = React.createContext();

export default function App() {

  console.log(get('config'));
  const [state, setStateUnsaved] = useState<Config>(get('config') || defaultConfig );

  console.log(getDataPath());
  const setConfig = (config: Config) => {
    setStateUnsaved(config);
    set('config', config)
  }

  return <ConfigContext.Provider value={{ config: state, setConfig }}>
    <Router>
      <Switch>
        <Route path={routes.HOME} component={Home}/>
      </Switch>
    </Router>
  </ConfigContext.Provider>;

}
