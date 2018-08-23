import * as React from 'react';
import './App.css';
import { BallWrap } from "./Ball/BallWrap";


class App extends React.Component{
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <BallWrap/>;
    }
}

export default App;
