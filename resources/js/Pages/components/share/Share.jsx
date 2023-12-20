import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { Inertia } from "@inertiajs/inertia";
export default function Share() {
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);

    const handleTextChange = (e) => {
        setComment(e.target.value);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("file", image);
        Inertia.post(route("posts.store"), formData);
        setComment("");
        setImage(null);
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="" alt="" className="shareProfileImg" />
                    <input
                        type="text"
                        className="shareInput"
                        placeholder="今何してるの？"
                        name="comment"
                        value={comment}
                        onChange={handleTextChange}
                    />
                </div>
                <form
                    className="shareButtons"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <hr className="shareHr" />
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <Image className="shareIcon" htmlColor="blue" />
                            <span className="shareOptionText">写真</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                                name="file"
                                onChange={handleImageChange}
                            />
                        </label>
                        <div className="shareOption">
                            <Gif className="shareIcon" htmlColor="hotpink" />
                            <span className="shareOptionText">GIF</span>
                        </div>
                        <div className="shareOption">
                            <Face className="shareIcon" htmlColor="green" />
                            <span className="shareOptionText">気持ち</span>
                        </div>
                        <div className="shareOption">
                            <Analytics className="shareIcon" htmlColor="red" />
                            <span className="shareOptionText">投票</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        投稿
                    </button>
                </form>
            </div>
        </div>
    );
}
