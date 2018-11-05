import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "../pages/Home";


export default class RouterMap extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/Comment" component={Home}/>
        </Switch>
    }
}
