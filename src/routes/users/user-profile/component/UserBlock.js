/**
 * User Block
 */
import React, { Component } from 'react';

class UserBlock extends Component {
    render() {
        return (
            <div className="profile-top mb-10">
                <img src={require('Assets/img/profile-bg.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345" />
                <div className="profile-content">
                    <div className="media">
                         <img src={require('Assets/avatars/profile.jpg')} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" /> 
                        <div className="media-body pt-5">
                            <div className="mb-10">
                            <h2>Test User</h2>
                                {/* <h2>Lucile Beck</h2> */}
                                {/* <p>info@example.com</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBlock;
