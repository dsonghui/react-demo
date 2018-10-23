import * as React from 'react';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { BallWrap } from "./Ball/BallWrap";
import { Post } from "./example/Post";
import { CommentApp } from "./example/commentApp";


class App extends React.Component {
    app: string;
    constructor(props: any) {
        super(props);
        this.app = 'Ball';
        if (window.location.hash) {
            this.app = window.location.hash.replace('#', '');
        }
    }
    public render() {
        return <HashRouter>
            <div>
                <Route path="/Ball" component={BallWrap}/>
                <Route path="/Post" component={Post}/>
                <Route path="/Comment" component={CommentApp}/>
            </div>
        </HashRouter>
    }
}

export default App;
