import React, { useContext, useEffect, useState, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Post.css";
import ConfirmationModal from "../deletemodal/ConfirmationModal";
import CommentModal from "../commentmodal/CommentModal";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comment from "../../Comment/Index";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Post({ post, comments, postImage }) {
    const baseUrl = import.meta.env.BASE_URL;
    const imageUrl = `${baseUrl}storage/${post.image}`;
    const userImage = `${baseUrl}storage/${post.user.image}`;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isCommentOpen, setCommentOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [isLiked, setIsLiked] = useState(post.likes_count);
    const [filteredComments, setFilteredComments] = useState([]);
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
    const likeSubmit = (e) => {
        e.preventDefault();

    }
    const handleModalClose = () => {
        // モーダルが閉じられたときの処理
        setModalOpen(false);
    };
    const handleCommentClose = () => {
        setCommentOpen(false);
    };
    const handleCommentClick = () => {
        setCommentOpen(true);
    };
    const onShowComment = () => {
        setShowComment(!showComment);
    };
    const handleClickLike = () => {
        try {
            Inertia.post(route("posts.toggle_like", { id: post.id }));
        } catch (error) {
            console.error("削除エラー", error);
        }
        setIsLiked(!isLiked);
    };
    useEffect(() => {
        const filteredComments = comments.filter(
            (comment) => comment.post_id === post.id
        );
        setFilteredComments(filteredComments);
    }, [comments, post.id]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {userImage !== "/storage/null" ? (
                            <img
                                src={userImage}
                                alt=""
                                className="postProfileImg"
                            />
                        ) : (
                            <img
                                src="/images/noAvatar.png"
                                className="postProfileImg"
                            />
                        )}

                        <span className="postUsername">{post.user.name}</span>
                        <span className="postDate"></span>
                    </div>
                    <div className="relative">
                        <DeleteIcon
                            className="text-red-500 cursor-pointer"
                            onClick={handleDeleteClick}
                        />
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            onRequestClose={handleModalClose}
                            onConfirm={handleConfirmDelete}
                        />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.comment}</span>
                    {imageUrl !== "/storage/null" && (
                        <img src={imageUrl} alt="Post Image" />
                    )}
                    <br />
                    <small className="mt-2">
                        {new Date(post.created_at).toLocaleString()}
                    </small>
                </div>
                <div className="postBottom">
                    <form onSubmit={likeSubmit}>
                        <div className="postBottomLeft">
                            {isLiked ? (
                                <FavoriteIcon
                                    className="text-red-500"
                                    onClick={handleClickLike}
                                />
                            ) : (
                                <FavoriteBorderIcon onClick={handleClickLike} />
                            )}
                            {isLiked}
                            <input
                                type="hidden"
                                name="post_id"
                                value={post.id}
                            />
                        </div>
                    </form>
                    <div className="postBottomRight relative">
                        <ChatBubbleOutlineIcon
                            className="mr-8"
                            onClick={onShowComment}
                        />
                        <span
                            className="postCommentText"
                            onClick={handleCommentClick}
                        >
                            コメントする
                        </span>
                        <CommentModal
                            isOpen={isCommentOpen}
                            onRequestClose={handleCommentClose}
                            onSaveComment={setNewComment}
                            post={post}
                        />
                        {showComment && <Comment comments={filteredComments} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
