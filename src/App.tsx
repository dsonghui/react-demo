import * as React from 'react';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from "./Layout";
import AsyncLoading from "./components/AsyncLoading";

const BallApp = Loadable({
    loader: () => import("./Apps/Ball/BallWrap"),
    loading: AsyncLoading
});
const CommentApp = Loadable({
    loader: () => import("./Apps/commentApp"),
    loading: AsyncLoading
});


export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <HashRouter>
            <Layout>
                <Switch>
                    <Route path="/Ball" component={BallApp}/>
                    <Route path="/Comment" component={CommentApp}/>
                </Switch>
            </Layout>
        </HashRouter>
    }
}
