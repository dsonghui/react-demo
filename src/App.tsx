import * as React from 'react';
import './App.css';
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
        return <div>
            {this.app === 'Ball' && <BallWrap/>}
            {this.app === 'Post' && <Post content="isContent"/>}
            {this.app === 'Comment' && <CommentApp />}
        </div>
    }
}

export default App;
