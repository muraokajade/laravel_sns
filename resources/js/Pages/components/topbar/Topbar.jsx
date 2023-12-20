import {
    Chat,
    NotificationAdd,
    Notifications,
    Person,
    Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Topbar.css";
export default function Topbar({user}) {
    const baseUrl = import.meta.env.BASE_URL;
    const imageUrl = `${baseUrl}storage/${user.image}`;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Real SNS</span>
            </div>
            <div className="topbarCenter">
                <Search className="searchIcon text-white" />
                <input
                    type="text"
                    className="searchbar"
                    placeholder="探し物は何ですか？"
                />
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>

                    <img src={imageUrl} alt="" className="topbarImg" />
                </div>
            </div>
        </div>
    );
}
