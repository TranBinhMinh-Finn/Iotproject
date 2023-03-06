import React, { Component } from "react";
import profilepic1 from '../img/Smartfarm3.jpg'


class About extends Component {
    render() {
        return (
            <div className="condiv about">
                <h1 className="subtopic">About Us</h1>
                <img src={profilepic1} alt="profile1" className="profilepic1" />
                <h3>Danh sách nhóm</h3>
                <p>Thanongsith THAVISACK 20180288</p>
                <p>Trần Bình Minh 20180138</p>
                <p>Phạm Nhật Minh 20194329 </p>
                <p>Chea Na 20190152</p>
            </div>
            )
    }
}

export default About; 