/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {



	toggleMenu(menu, stateCategory) {
		let data = {
			menu,
			stateCategory
		}
		this.props.onToggleMenu(data);
	}

	render() {
		

		const { sidebarMenus } = this.props.sidebar;
		return (
			<div className="rct-sidebar-nav">
				<nav className="navigation">
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={
							<ListSubheader className="side-title" component="li" >
								<IntlMessages id="sidebar.general" />
							</ListSubheader>}
					>

						{localStorage.getItem("user_type_id") == 1 ? sidebarMenus.category1.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category1')}
							/>
						)) :
						 sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						))
						}
						{localStorage.getItem("user_type_id") == 2 ? sidebarMenus.category7.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category7')}
							/>
						)) :
						 sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						))
						}
						{localStorage.getItem("user_type_id") == 3 ? sidebarMenus.category8.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category8')}
							/>
						)) :
						 sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						))
						}
						{localStorage.getItem("user_type_id") == 4 ? sidebarMenus.category1.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category1')}
							/>
						)) :
						 sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						))
						}

					</List>
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.component" /></ListSubheader>}
					>
						{sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						))}
					</List>
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.features" /></ListSubheader>}
					>
						{sidebarMenus.category4.map((menu, key) => (
							<NavMenuItem
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category4')}
							/>
						))}
					</List>
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={<ListSubheader className="side-title" component="li">
							<IntlMessages id="sidebar.applications" /></ListSubheader>}
					>
						{sidebarMenus.category5.map((menu, key) => (
							<NavMenuItem
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category5')}
							/>
						))}
					</List>
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={<ListSubheader className="side-title" component="li">
							<IntlMessages id="sidebar.extensions" /></ListSubheader>}
					>
						{sidebarMenus.category6.map((menu, key) => (
							<NavMenuItem
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category6')}
							/>
						))}
					</List>
				</nav>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ sidebar, settings }) => {
	return { sidebar, settings };
};

export default withRouter(connect(mapStateToProps, {
	onToggleMenu
})(SidebarContent));
