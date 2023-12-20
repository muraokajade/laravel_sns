import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { useState } from "react";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // オーバーレイの背景色
    },
    content: {
        height: "80%",
        width: "80%",
        top: "30%",
        left: "10%",
        position: "absolute",
    },
};

const PreviewCoverModal = ({
    previewCoverImage,
    setModalIsOpen,
    isOpen,
    setPreviewCoverImage,
}) => {
    useEffect(() => {
        ReactModal.setAppElement("#app");
    }, []);

    const handleClose = () => {
        setModalIsOpen(true);
        setPreviewCoverImage("");
    };
    const handleSaveImage = () => {
        setPreviewCoverImage=(previewCoverImage);
        setModalIsOpen(false);
    }
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <div className="modal-top">
                    <CloseIcon
                        onClick={handleClose}
                        className="cursor-pointer"
                    />
                    <button
                        className="bg-slate-800 rounded-xl p-2 text-white"
                        type="submit"
                        onClick={handleSaveImage}
                    >
                        適用
                    </button>
                </div>
                <img
                    src={previewCoverImage}
                    alt="Preview Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </ReactModal>
    );
};

export default PreviewCoverModal;
