import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";

//タイムライン用とプロフィール用がある。
export default function Feed({ posts, comments, postImages }) {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post, index) => (
                    <Post
                        key={post.id}
                        post={post}
                        comments={comments}
                        postImage={postImages[index]}
                    />
                ))}
            </div>
        </div>
    );
}
