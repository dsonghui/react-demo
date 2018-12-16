import * as React from 'react';
import { inject, observer } from "mobx-react";
import { StoreType } from "@/store";


interface IMyComponentProps {
    myProps: { str: string };
}

@inject('Store')
@observer
export default class Home<T extends { Store: StoreType }> extends React.Component<T & IMyComponentProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.Store.updateLoading(!this.props.Store.loading);
    }

    public render() {
        console.log(this.props.Store.loading);
        return <div>
            {this.props.Store.loading}
            <div onClick={this.handleClick}>Click</div>
        </div>
    }
}
