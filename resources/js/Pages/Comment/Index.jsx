import React from "react";
import "./Comments.css";
const Comment = ({ comments }) => {
    return (
        <div className="comments">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <strong>{comment.user.name}</strong>: {comment.body}
                </div>
            ))}
        </div>
    );
};

export default Comment;
