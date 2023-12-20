import React from "react";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "./Modal.css";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // オーバーレイの背景色
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "70%",
    },
};

const CommentModal = ({
    isOpen,
    onRequestClose,
    onConfirm,
    onSaveComment,
    post,
}) => {
    const baseUrl = import.meta.env.BASE_URL;
    const imageUrl = `${baseUrl}storage/${post.user.image}`;
    useEffect(() => {
        ReactModal.setAppElement("#app"); // ここにアプリのルートエレメントのIDを指定
    }, []);
    const [comment, setComment] = useState("");
    const handleSaveComment = async () => {
        try {
            // Inertia.postを使用してコメントをサーバーサイドに送信
            Inertia.post(route("comments.store"), {
                body: comment,
                post_id: post.id,
            });

            // コメントが保存された後の処理をここに追加
            // 例: モーダルを閉じるなど

            onSaveComment(comment); // コメントが保存されたことを親コンポーネントに通知
        } catch (error) {
            console.error("コメントエラー", error);
        }
    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    return (
        <ReactModal
            className="modalContainer"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <div className="flex flex-col">
                <div className="flex items-center">
                    {imageUrl !== "/storage/null" ? (
                        <img
                            src={imageUrl}
                            className="w-16 h-16 rounded-full"
                        />
                    ) : (
                        <img
                            src="/images/noAvatar.png"
                            className="w-16 h-16 rounded-full"
                        />
                    )}

                    <strong className="text-xl ml-2">{post.user.name}</strong>
                </div>
                <div className="p-4">{post.comment}</div>
                <textarea
                    className="border-b border-none h-44 resize-none"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="your comment"
                    name="body"
                ></textarea>
                <div className="mt-4">
                    <button
                        className="m-4 border p-2 rounded bg-slate-800 text-white"
                        onClick={handleSaveComment}
                    >
                        コメントを投稿
                    </button>
                    <button
                        className="m-4 border p-2 rounded hover:bg-blue-300"
                        onClick={onRequestClose}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default CommentModal;
