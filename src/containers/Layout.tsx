import * as React from 'react';

export default class Layout extends React.Component {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <div className="Layout">{this.props.children}</div>
    }
}
