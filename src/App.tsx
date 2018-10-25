import * as React from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom';
import Layout from "./Layout";
import RouterMap from "./router";
import store from "./store";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <Provider store={store}>
            <HashRouter>
                <Layout>
                    <RouterMap/>
                </Layout>
            </HashRouter>
        </Provider>
    }
}
