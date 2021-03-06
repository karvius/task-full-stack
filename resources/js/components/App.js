import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import UsersList from './users/UsersList';
import NewUser from './users/NewUser';
import EditUser from './users/EditUser';
import NotFound from './common/NotFound';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={UsersList} />
                        <Route path="/create" component={NewUser} />
                        <Route path="/edit" component={EditUser} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
