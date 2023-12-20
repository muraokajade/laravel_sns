import React from "react";
import "./Profile.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaneModal from "../planeModal/planeModal";
import Post from "../post/Post";
import ConfirmationModal from "../deletemodal/ConfirmationModal";
import { useState } from "react";
import UserPost from "./UserPost";
const Profile = ({ user, userPosts, followingCount, followersCount }) => {
    const baseUrl = import.meta.env.BASE_URL;
    const imageUrl = `${baseUrl}storage/${user.image}`;
    const coverImage = `${baseUrl}storage/${user.cover_image}`;
    const [isModalOpen, setModalOpen] = useState(false);
    const handleDeleteClick = () => {
        setModalOpen(true);
    };
    const handleConfirmDelete = async () => {
        try {
            Inertia.delete(route("posts.destroy", { id: post.id }));
            setModalOpen(false); // モーダルを閉じる
        } catch (error) {
            console.error("削除エラー", error);
        }
    };
    const handleModalClose = () => {
        // モーダルが閉じられたときの処理
        setModalOpen(false);
    };
    return (
        <>
            <div className="profile">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {console.log(user.cover_image)}
                            {user.cover_image ? (
                                <img
                                    src={coverImage}
                                    className="profileCoverImg"
                                />
                            ) : (
                                <img
                                    src="/images/nobg.jpg"
                                    className="profileCoverImg"
                                />
                            )}

                            {user.image ? (
                                <img
                                    src={imageUrl}
                                    alt=""
                                    className="profileUserImg"
                                />
                            ) : (
                                <img
                                    src="/images/noAvatar.png"
                                    alt=""
                                    className="profileUserImg"
                                />
                            )}

                            <PlaneModal />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name}</h4>
                            <span className="profileInfoDesc">
                                {user.profile}
                            </span>
                            <div className="flex mt-4">
                                <small>フォロー中{followingCount}</small>
                                <small className="ml-4">
                                    フォロワー{followersCount}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="profileRightBottom"></div>
                    <div>
                        {userPosts.map((post) => (
                            <UserPost post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
