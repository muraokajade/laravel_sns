import React from "react";
import ReactModal from "react-modal";
import { useEffect } from "react";
import "./Modal.css";
const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
    useEffect(() => {
        ReactModal.setAppElement("#app"); // ここにアプリのルートエレメントのIDを指定
    }, []);
    return (
        <ReactModal
            className="modalContainer"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="text-center">
                <p>2度と直せませんが本当に削除しますか？</p>
                <button
                    className="m-4 border p-2 rounded hover:bg-red-300"
                    onClick={onConfirm}
                >
                    はい
                </button>
                <button
                    className="m-4 border p-2 rounded hover:bg-blue-300"
                    onClick={onRequestClose}
                >
                    キャンセル
                </button>
            </div>
        </ReactModal>
    );
};

export default ConfirmationModal;
