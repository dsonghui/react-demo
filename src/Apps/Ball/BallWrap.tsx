import * as React from "react";
import "./App.css";
import { windowWrap } from "../../lib/Ball";
import { BallItem } from "./BallItem";

interface IState {
    wrap: windowWrap
}

export default class BallWrap extends React.Component<object, IState> {

    constructor(props: any) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.state = {
            wrap: new windowWrap(800, 600)
        }
    }
    componentDidMount() {
        setInterval(
            () => this.updateBalls(),
            10
        );
    }

    updateBalls() {
        this.state.wrap.balls.map(ball => {
            ball.update(this.state.wrap.width, this.state.wrap.height)
        });
        this.updateState();
    }

    handleStart(e: any) {
        this.state.wrap.start(e);
        this.updateState();
    }

    updateState() {
        this.setState({
            wrap: this.state.wrap
        });
    }

    public render() {

        return (
            <div className="BallWrap"
                 style={{ width: this.state.wrap.width + 'px', height: this.state.wrap.height + 'px' }}>
                {this.state.wrap.balls.length > 0 &&
                this.state.wrap.balls.map(ball => {
                    return <BallItem Ball={ball} Wrap={this.state.wrap} key={ball.key}/>
                })
                }

                {
                    !this.state.wrap.started && (<span className="startbtn" onClick={this.handleStart}> Start </span>)
                }

            </div>
        );
    }
}
