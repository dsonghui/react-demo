import * as React from 'react';
import { inject, observer } from "mobx-react";
import { StoreType } from "@/store";


interface MyComponentProps {
    myProps: { str: string };
}

@inject('Store')
@observer
export default class Home<T extends { Store: StoreType }> extends React.Component<T & MyComponentProps, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        console.log(this.props.Store.loading);
        return <div>
            Home
        </div>
    }
}
