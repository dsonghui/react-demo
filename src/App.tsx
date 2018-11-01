import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from "./containers/Layout";
import RouterMap from "./router";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <HashRouter>
            <Layout>
                <RouterMap/>
            </Layout>
        </HashRouter>
    }
}
