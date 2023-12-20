import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./planeModal.css";
import { Inertia } from "@inertiajs/inertia";
import PreviewModal from "./previewModal";
import PreviewCoverModal from "./planeCoverModal";
// モーダルのスタイル
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
        width: "80%",
    },
};

// モーダルのコンポーネント
const MyModal = ({ isOpen, onRequestClose }) => {
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const [image, setImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [showNameError, setShowNameError] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewCoverImage, setPreviewCoverImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        ReactModal.setAppElement("#app");
    }, []);
    const handleFileIconClick = () => {
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
        fileInput.addEventListener("change", handleImageChangePreview);
        setModalIsOpen(true);
    };
    const handleImageChangePreview = (e) => {
        const image = e.target.files[0];
        setPreviewImage(URL.createObjectURL(image));
    };
    const handleFileCoverIconClick = () => {
        const coverInput = document.getElementById("coverImageInput");
        coverInput.click();
        coverInput.addEventListener("change", handleCoverImageChangePreview);
        setModalIsOpen(true);
    };
    const handleCoverImageChangePreview = (e) => {
        const coverImage = e.target.files[0];
        setPreviewCoverImage(URL.createObjectURL(coverImage));
    };
    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setImage(image);
    };
    const handleCoverImageChange = (e) => {
        const coverImage = e.target.files[0];
        setCoverImage(coverImage);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover_image", coverImage);
        formData.append("image", image);
        if (name.trim() === "") {
            setShowNameError(true);
            return;
        }
        setShowNameError(false);
        formData.append("name", name);
        formData.append("profile", profile);
        console.log(formData);
        Inertia.post(route("profile.updateProfile"), formData);
        setImage(null);
        setCoverImage(null);
        onRequestClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="modal-top">
                    <CloseIcon
                        onClick={onRequestClose}
                        className="cursor-pointer"
                    />
                    <h1>プロフィール編集</h1>
                    <button
                        className="bg-slate-800 rounded-xl p-2 text-white"
                        type="submit"
                    >
                        保存
                    </button>
                </div>
                <div className="relative bg-gray-300 h-48 w-auto mt-2">
                    {previewCoverImage ? (
                        <img src={previewCoverImage} className="cover-image" />
                    ) : (
                        <img
                            src="/images/noAvatar.png"
                            className="cover-image"
                        />
                    )}

                    {previewImage && (
                        <PreviewModal
                            previewImage={previewImage}
                            isOpen={modalIsOpen}
                            onRequestClose={onRequestClose}
                            setPreviewImage={setPreviewImage}
                            setModalIsOpen={setModalIsOpen}
                        />
                    )}

                    {previewCoverImage && (
                        <PreviewCoverModal
                            previewCoverImage={previewCoverImage}
                            setPreviewCoverImage={setPreviewCoverImage}
                            isOpen={modalIsOpen}
                            onRequestClose={onRequestClose}
                            setModalIsOpen={setModalIsOpen}
                        />
                    )}
                    <CameraAltIcon
                        className="camera-icon"
                        onClick={handleFileCoverIconClick}
                    />
                    <input
                        type="file"
                        name="cover_image"
                        id="coverImageInput"
                        className="hidden"
                        onChange={handleCoverImageChange}
                    />
                    <div className="profile_image_edit">
                        {previewImage ? (
                            <img src={previewImage} className="profile_img" />
                        ) : (
                            <img
                                src="/images/carua.jpeg"
                                className="profile_img"
                            />
                        )}

                        <CameraAltIcon
                            className="camera-icon"
                            onClick={handleFileIconClick}
                        />
                        <input
                            type="file"
                            name="image"
                            id="fileInput"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="modal-main">
                    <input
                        className="w-full"
                        placeholder="名前"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {showNameError && (
                        <p style={{ color: "red" }}>名前は必須です。</p>
                    )}
                    <textarea
                        className="w-full h-[100px] resize-none"
                        name="profile"
                        placeholder="自己紹介"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    ></textarea>
                </div>
            </form>
        </ReactModal>
    );
};

// モーダルをトリガーするコンポーネント
const PlaneModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div>
            <button
                className="p-2 ml-auto border rounded-xl hover:bg-gray-100"
                onClick={openModal}
            >
                Edit Profile
            </button>
            <MyModal isOpen={modalIsOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default PlaneModal;
