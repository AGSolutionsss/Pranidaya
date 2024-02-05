import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import SupportPage from '../Support/Support';
import { logoutUserFromFirebase } from 'Actions';
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false,
		flag:false
	}
	 
	logoutUser(e) {
		e.preventDefault();
		this.setState({flag:true});
		this.setState({login:false});
		this.props.logoutUserFromFirebase();
		

	}

	
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		if(this.state.flag){
			return <Redirect to="/" push={true}></Redirect>
		}
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<img
									src={require('Assets/avatars/profile.jpg')}
									alt="user profile"
									className="img-fluid rounded-circle"
									width="50"
									height="100"
								/>
							</div>
							<div className="user-info">
							<span className="user-name ml-4">{localStorage.getItem("full_name")}</span>
							
								<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
							</div>
							


						</DropdownToggle>

						
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									
								</li>
								<li>
									<Link to={{
										pathname: '/app/users/user-profile',
										state: { activeTab: 0 }
									}}>
										<i className="zmdi zmdi-account text-primary mr-3"></i>
										<span><IntlMessages id="widgets.profile" /></span>
									</Link>
								</li>
								 
								<li className="border-top">
									<a href="#" onClick={(e) => this.logoutUser(e)}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<span><IntlMessages id="widgets.logOut" /></span>
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
					
				</div>
				
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(UserBlock);
