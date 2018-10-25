interface IStateinitState {
    comments: any[]
}

const initState: IStateinitState = {
    comments: []
};

const reducer = (state = initState, action) => {
    let comments: any = state.comments;
    switch (action.type) {
        case 'PUSH_COMMENT':
            let comment = action.payload;
            comment.key = new Date().getTime();
            return {
                ...state,
                comments: [...comments, comment],
            };
        case 'DELETE_COMMENT':
            let index = comments.findIndex(item => item.key === action.payload);
            if (index >= 0) {
                comments.splice(index, 1);
            }
            return {
                ...state,
                comments: [...comments],
            };
        default:
            return state;
    }
};

export const createAddCommentsAction = (comment) => {
    return {
        type: 'PUSH_COMMENT',
        payload: comment
    }
}
export const createDeleteCommentAction = (key) => {
    return {
        type: 'PUSH_COMMENT',
        payload: key
    }
}

export {
    reducer
}
