import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

function Routes(){
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/details/:type/:id" exact component={Details} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;