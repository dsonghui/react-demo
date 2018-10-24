import * as React from "react";
import { Provider, connect } from 'react-redux'
import './index.less';
import { createStore } from "redux";

const COMMENTLIST = 'COMMENTLIST';
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
        this.state = { name: Comment.getLastUserName() || '', content: '' };
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
        Comment.saveLastUserName(this.state.name);
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        console.log(this.props);
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
        console.log(this.props);
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


export class CommentManager {
    comments: ICommentEntity[] = [];
    constructor() {
        let comments = [];
        let commentsString = window.localStorage.getItem(COMMENTLIST);
        if (commentsString) {
            comments = JSON.parse(commentsString);
        }
        this.comments = comments;
    }

    addComment(comment: ICommentEntity) {
        comment.key = new Date().getTime();
        this.comments.push(comment);
        this.syncSaveComment(this.comments);
    }

    delComment(comment: ICommentEntity) {
        let index = this.comments.findIndex(item => item.key === comment.key);
        if (index >= 0) {
            this.comments.splice(index, 1);
            this.syncSaveComment(this.comments);
        }
    }

    getComments() {
        return this.comments;
    }

    getLastUserName() {
        return window.localStorage.getItem(COMMENTLASTNAME)
    }

    saveLastUserName(name) {
        return window.localStorage.setItem(COMMENTLASTNAME, name)
    }

    syncSaveComment(comments) {
        window.localStorage.setItem(COMMENTLIST, JSON.stringify(comments));
    }
}

const Comment = new CommentManager();

let preloadedState: any = { comments: Comment.getComments() };

const store = createStore(commentAppReducer, preloadedState);

store.subscribe(() => {
    Comment.syncSaveComment(store.getState().comments);
});


function commentAppReducer(state: any = { comments: [] }, action: any) {
    let comments: any = state.comments;
    switch (action.type) {
        case 'PUSH_COMMENT':
            let comment = action.payload;
            comment.key = new Date().getTime();
            comments.push(comment);
            return {
                comments: comments.map(m => {
                    return m
                })
            };
        case 'DELETE_COMMENT':
            let index = comments.findIndex(item => item.key === action.payload);
            if (index >= 0) {
                comments.splice(index, 1);
            }
            return {
                comments: comments.map(m => {
                    return m
                })
            };
        default:
            return state;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        commentDelete: (comment: ICommentEntity) => {
            dispatch({
                type: 'DELETE_COMMENT',
                payload: comment.key
            });
        },
        commentInput: (name, content) => {
            console.log(ownProps);
            dispatch({
                type: 'PUSH_COMMENT',
                payload: { name, content }
            });
        }
    };
}

const MyCommentList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);
const MyCommentInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInput);


export default class CommentApp extends React.Component<any, { comments: ICommentEntity[] }> {
    timer: any;
    constructor(props: any) {
        super(props);
        // this.state = { comments: Comment.getComments() };
        // this.handleCommentInput = this.handleCommentInput.bind(this);
        // this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }

    // handleCommentInput(name: string, content: string) {
    //     Comment.addComment({
    //         name,
    //         content
    //     });
    //     this.updateComments();
    // }
    // handleCommentDelete(commnent: ICommentEntity) {
    //     Comment.delComment(commnent);
    //     this.updateComments();
    // }

    // updateComments() {
    //     this.setState({
    //         comments: Comment.getComments()
    //     });
    // }

    // componentWillMount() {
    //     this.timer = setInterval(() => {
    //         this.updateComments();
    //     }, 5000)
    // }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <Provider store={store}>
            <div className="CommentApp">
                <MyCommentInput/>
                <MyCommentList/>
            </div>
        </Provider>
    }
}
