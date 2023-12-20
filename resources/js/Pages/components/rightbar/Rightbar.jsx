import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "./Rightbar.css";

export default function Rightbar({ user, recommended_users, isFollowing }) {
    const [followed, setFollowed] = useState(false);

    const handleFollow = (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("follow_id", id);
        console.log("FormData:", formData);
        Inertia.post(route("follows.store"), formData);
    };
    const handleUnFollow = (e, id) => {
        e.preventDefault();
        Inertia.delete(route("follows.destroy", { id: id }));
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="assets/star.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>フォロワー限定</b>イベント開催中！
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.jpeg" alt="" />
                <h4 className="rightbarTitle">オンラインの友達</h4>
                <ul className="rightbarFriendList"></ul>
                <p className="promotionTitle">プロモーション広告</p>
                <img
                    className="rightbarPromotionImg"
                    src="assets/promotion/promotion1.jpeg"
                    alt=""
                />
                <p className="promotionName">ショッピング</p>
                <img
                    className="rightbarPromotionImg"
                    src="assets/promotion/promotion2.jpeg"
                    alt=""
                />
                <p className="promotionName">カーショップ</p>
                <img
                    className="rightbarPromotionImg"
                    src="assets/promotion/promotion3.jpeg"
                    alt=""
                />
                <p className="promotionName">ShinCode株式会社</p>
            </>
        );
    };

    const ProfileRightbar = () => {
        const baseUrl = import.meta.env.BASE_URL;
        return (
            <>
                <div className="rightbarInfo">
                    <h4 className="rightbarTitle">オススメユーザー</h4>
                    <div className="rightbarFollowings">
                        {recommended_users.map((user) => (
                            <div className="rightbarFollowing" key={user.id}>
                                <div className="flex items-center">
                                    {user.image ? (
                                        <img
                                            src={`${baseUrl}storage/${user.image}`}
                                            alt=""
                                            className="rightbarFollowingImg"
                                        />
                                    ) : (
                                        <img
                                            src="/images/noAvatar.png"
                                            alt=""
                                            className="rightbarFollowingImg"
                                        />
                                    )}

                                    <span className="rightbarFollowingName">
                                        {user.name}
                                    </span>
                                </div>
                                {isFollowing[user.id] ? (
                                    <form
                                        onSubmit={(e) =>
                                            handleUnFollow(e, user.id)
                                        }
                                    >
                                        <button
                                            type="submit"
                                            className="UnfollowBtn"
                                        >
                                            フォロー解除
                                        </button>
                                    </form>
                                ) : (
                                    <form
                                        onSubmit={(e) =>
                                            handleFollow(e, user.id)
                                        }
                                    >
                                        <button
                                            type="submit"
                                            className="followBtn"
                                        >
                                            フォローする
                                        </button>
                                        <input
                                            type="hidden"
                                            name="follow_id"
                                            value={user.id}
                                        />
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
