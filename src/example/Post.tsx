import * as React from "react";
// import * as PropTypes from 'prop-types'

interface IPropsPost {
    content: string;
}


export class Post extends React.Component<IPropsPost, any> {
    p: HTMLElement;
    static defaultProps = {
        content: 'defaultContent'
    }


    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.p);
        console.log(this.p.offsetHeight);
        console.log(this.p.clientHeight);
    }

    render() {
        return (<p ref={(p: any) => this.p = p} onClick={this.handleClick}>
            {this.props.content}
        </p>)
    }
}
