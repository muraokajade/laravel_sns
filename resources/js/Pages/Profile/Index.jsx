import React from "react";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "../components/profile/Profile";
import Rightbar from "../components/rightbar/Rightbar";

const Index = ({
    user,
    userPosts,
    recommended_users,
    isFollowing,
    followersCount,
    followingCount,
}) => {
    return (
        <>
            <Topbar user={user} />
            <div className="flex w-full bg-[#f8fcff]">
                <Sidebar />
                <Profile
                    user={user}
                    userPosts={userPosts}
                    followersCount={followersCount}
                    followingCount={followingCount}
                />
                <Rightbar
                    recommended_users={recommended_users}
                    user={user}
                    isFollowing={isFollowing}
                />
            </div>
        </>
    );
};

export default Index;
