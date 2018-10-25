import * as React from "react";
import { connect } from 'react-redux'
import './index.less';
import { createAddCommentsAction, createDeleteCommentAction } from "./store";

const COMMENTLASTNAME = 'COMMENTLASTNAME';

interface ICommentEntity {
    key?: any;
    name: string;
    content: string;
}


interface IPropsCommentInput {
    commentInput(name: string, content: string): any;
}


export class CommentInput extends React.Component<IPropsCommentInput, any> {
    input: any;
    constructor(props: any) {
        super(props);
        this.state = { name: window.localStorage.getItem(COMMENTLASTNAME) || '', content: '' };
        this.handleInput = this.handleInput.bind(this);
        this.handleInputTextarea = this.handleInputTextarea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    handleInputTextarea(event: any) {
        this.setState({
            content: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.commentInput(this.state.name, this.state.content);
        window.localStorage.setItem(COMMENTLASTNAME, this.state.name)
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <div className="CommentInput">
            <div className="comment-field">
                <div className="comment-field-name">用户名：</div>
                <div className="comment-field-input">
                    <input value={this.state.name} onChange={this.handleInput}/>
                </div>
            </div>
            <div className="comment-field">
                <div className="comment-field-name">评论内容：</div>
                <div className="comment-field-input">
                    <textarea value={this.state.content} onChange={this.handleInputTextarea}
                              ref={(input) => this.input = input}/>
                </div>
            </div>
            <div className="comment-field">
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit}>提交</button>
                </div>
            </div>
        </div>
    }
}

export class CommentList extends React.Component<{ comments: ICommentEntity[], commentDelete(comment): any }, any> {
    render() {
        return <div className="CommentList">
            {this.props.comments.map(comment => {
                return <CommentItem comment={comment} key={comment.key} commentDelete={this.props.commentDelete}/>
            })}
        </div>
    }
}

export class CommentItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() {
        this.props.commentDelete(this.props.comment);
    }

    get niceTime() {
        if (this.props.comment.key) {
            let t = new Date().getTime() - this.props.comment.key;
            if (t > 86400000) {
                let date = new Date(this.props.comment.key);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                return Y + M + D + h + m + s;
            } else if (t < 60000) {
                return Math.ceil(t / 1000) + '秒前';
            } else {
                return Math.ceil(t / 60000) + '分前';
            }
        }
        return '-';
    }

    get Content() {
        return this.props.comment.content ? this.props.comment.content.replace(/\r?\n/g, '<br />') : '';
    }

    render() {
        return <div className="comment-item">
            <div className="comment-item-name"><span>{this.props.comment.name}</span>：</div>
            <div className="comment-item-content" dangerouslySetInnerHTML={{ __html: this.Content }}/>
            <span className="comment-item-createtime">{this.niceTime}</span>
            <span className="comment-item-delete" onClick={this.handleDelete}>删除</span>
        </div>
    }
}

const mapDispatchToProps = (
    dispatch
) => {
    return {
        commentDelete: (comment: ICommentEntity) => {
            dispatch(createDeleteCommentAction(comment.key));
        },
        commentInput: (name, content) => {
            console.log(createAddCommentsAction({ name, content }));
            dispatch(createAddCommentsAction({ name, content }));
        }
    };
}

const MyCommentList = connect(
    (state, ownProps) => state.commentApp,
    mapDispatchToProps
)(CommentList);
const MyCommentInput = connect(
    (state, ownProps) => state.commentApp,
    mapDispatchToProps
)(CommentInput);


export default class CommentApp extends React.Component<any, { comments: ICommentEntity[] }> {
    timer: any;
    constructor(props: any) {
        super(props);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <div className="CommentApp">
            <MyCommentInput/>
            <MyCommentList/>
        </div>;
    }
}
