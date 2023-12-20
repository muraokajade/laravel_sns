import {
    Bookmark,
    Home,
    Message,
    MessageRounded,
    NotificationAdd,
    NotificationAddOutlined,
    Notifications,
    Person,
    RssFeed,
    Search,
    SearchOutlined,
    Settings,
} from "@mui/icons-material";
import React from "react";
import "./Sidebar.css";
import { Link } from "@inertiajs/react";

export default function Sidebar({ user }) {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link href="/posts">
                        <li className="sidebarListItem">
                            <Home className="sidebarIcon" />
                            <span className="sidebarListItemText">ホーム</span>
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <Search className="sidebarIcon" />
                        <span className="sidebarListItemText">検索</span>
                    </li>
                    <li className="sidebarListItem">
                        <Notifications className="sidebarIcon" />
                        <span className="sidebarListItemText">通知</span>
                    </li>
                    <li className="sidebarListItem">
                        <MessageRounded className="sidebarIcon" />
                        <span className="sidebarListItemText">メッセージ</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">
                            ブックマーク
                        </span>
                    </li>
                    {user && (
                        <Link href={route("profile.show", { id: user.id })}>
                            <li className="sidebarListItem">
                                <Person className="sidebarIcon" />
                                <span className="sidebarListItemText">
                                    プロフィール
                                </span>
                            </li>
                        </Link>
                    )}
                    <Link href="/dashboard">
                        <li className="sidebarListItem">
                            <Settings className="sidebarIcon" />
                            <span className="sidebarListItemText">設定</span>
                        </li>
                    </Link>
                </ul>
                <hr className="sidebarHr" />
            </div>
        </div>
    );
}
