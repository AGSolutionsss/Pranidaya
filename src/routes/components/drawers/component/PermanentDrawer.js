/*==== Permanent Drawer =====*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 180;

const styles = theme => ({
	root: {
		width: '100%',
		height: 430,
		marginTop: theme.spacing(3),
		zIndex: -1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	appBar: {
		position: 'absolute',
		width: `calc(100% - ${drawerWidth}px)`,
	},
	'appBar-left': {
		marginLeft: drawerWidth,
	},
	'appBar-right': {
		marginRight: drawerWidth,
	},
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: drawerWidth,
	},
	drawerHeader: theme.mixins.toolbar,
	content: {
		backgroundColor: theme.palette.background.default,
		width: '100%',
		padding: theme.spacing(2),
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			marginTop: 64,
		},
	},
});

class PermanentDrawer extends React.Component {
	state = {
		anchor: 'left',
	};

	handleChange = event => {
		this.setState({
			anchor: event.target.value,
		});
	};

	render() {
		const { classes } = this.props;
		const { anchor } = this.state;

		const drawer = (
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor={anchor}>
				<div className={classes.drawerHeader} />
				<Divider />
				<List>{mailFolderListItems}</List>
				<Divider />
				<List>{otherMailFolderListItems}</List>
			</Drawer>
		);
		let before = null;
		let after = null;
		if (anchor === 'left') {
			before = drawer;
		} else {
			after = drawer;
		}
		return (
			<div className={classes.root}>
				<TextField
					id="permanent-anchor"
					select
					label="Anchor"
					value={anchor}
					onChange={this.handleChange}
					margin="normal">
					<MenuItem value="left">left</MenuItem>
					<MenuItem value="right">right</MenuItem>
				</TextField>
				<div className={classes.appFrame}>
					<AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
						<Toolbar className="bg-info">
							<Typography variant="h6" color="inherit" noWrap>
								Permanent drawer
							</Typography>
						</Toolbar>
					</AppBar>
					{before}
					<main className={classes.content}>
					</main>
					{after}
				</div>
			</div>
		);
	}
}

PermanentDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
