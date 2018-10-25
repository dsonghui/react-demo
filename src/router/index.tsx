import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from "../components/AsyncComponent";

const BallApp = AsyncComponent(() => import("../Apps/Ball/BallWrap"));
const CommentApp = AsyncComponent(() => import("../Apps/commentApp"));


export default class RouterMap extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <Switch>
            <Route path="/Ball" component={BallApp}/>
            <Route path="/Comment" component={CommentApp}/>
        </Switch>
    }
}
