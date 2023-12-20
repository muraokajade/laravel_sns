import React from "react";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";

const Index = ({ posts, comments, postImages, user }) => {
    return (
        <>
            <Topbar user={user} />
            <div className="flex w-full bg-[#f8fcff]">
                <Sidebar user={user} />
                <Feed
                    posts={posts}
                    comments={comments}
                    postImages={postImages}
                />
            </div>
        </>
    );
};

export default Index;
