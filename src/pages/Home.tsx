import * as React from 'react';
import { inject, observer } from "mobx-react";
import { StoreType } from "@/store";


interface IMyComponentProps {
    myProps: { str: string };
}

interface Iconfig {
    r: number;
}

const config: Iconfig = {
    r: 350
};

@inject('Store')
@observer
export default class Home<T extends { Store: StoreType }> extends React.Component<T & IMyComponentProps, {}> {
    canvas: any;
    config: Iconfig;
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.config = config;
    }

    handleClick() {
        this.props.Store.updateLoading(!this.props.Store.loading);
    }

    componentDidMount(): void {
        let ctx: CanvasRenderingContext2D  = this.canvas.getContext('2d');
        ctx.fillStyle = '#ff3';
        ctx.fillRect(25, 25, 100, 100);
    }

    public render() {
        return <div>
            <div onClick={this.handleClick} style={{ width: this.config.r * 2 + 'px', 'margin': '100px auto' }}>
                <canvas id="MyCanvas" width={this.config.r * 2} height={this.config.r * 2}
                        ref={(canvas) => this.canvas = canvas}/>
            </div>
        </div>
    }
}
