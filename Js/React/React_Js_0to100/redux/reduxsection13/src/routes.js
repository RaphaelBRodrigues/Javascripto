import { Switch , Route } from 'react-router-dom';
import React from 'react';

import Home from './Home';
import Reservas from './Reservas';




const Routes = () => {
    return(
        <Switch>
            <Route path="/reservas" exact component={Reservas} />
            <Route path="/" exact component={Home} />
        </Switch>
    );
}

export default Routes;