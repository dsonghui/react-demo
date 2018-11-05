import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from "./containers/Layout";
import RouterMap from "./router";
import store from './store'
import { Provider } from "mobx-react";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <Provider Store={store}>
            <HashRouter>
                <Layout>
                    <RouterMap/>
                </Layout>
            </HashRouter>
        </Provider>
    }
}
