import * as React from "react";
import { Ball, windowWrap } from "../../lib/Ball";

interface IProps {
    Wrap: windowWrap
    Ball: Ball
}

export class BallItem extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    get MyStyle() {
        return {
            width: (2 * this.props.Ball.r) + 'px',
            height: (2 * this.props.Ball.r) + 'px',
            left: this.props.Ball.x + 'px',
            top: this.props.Ball.y + 'px',
            backgroundColor: this.props.Ball.color,
        }
    }

    public render() {

        return (
            <div className="BallItem" style={this.MyStyle}/>
        );
    }
}
