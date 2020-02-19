import * as React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import * as DataAccess from '../store/DataAccess';
import {apiAddress, getCookie} from '../store/DataAccess';
import '../css/NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean, storeName: string }> {
	public state = {
		isOpen: false,
		storeName: ''
	};

	componentDidMount() {
		this.checkStoreChange();
	}

	public render() {
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/"><img src={require("../resources/logo.jpg")} width="75px" alt="logo" /></NavbarBrand>
						<label style={{ fontSize: '25px' }}>{this.state.storeName}</label>
						<NavbarToggler onClick={this.toggle} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
							<ul className="navbar-nav flex-grow">
								<NavItem><NavLink tag={Link} className="text-dark" to="/home">Dashboard</NavLink></NavItem>
								<NavItem><NavLink tag={Link} className="text-dark" to="/inventory-form">Take Inventory</NavLink></NavItem>
								<NavItem><NavLink tag={Link} className="text-dark" to="/select-store">Change Store</NavLink></NavItem>
								<NavItem><NavLink tag={Link} className="text-dark" to="/" onClick={this.logout}>Logout</NavLink></NavItem>
							</ul>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		);
	}

	public checkStoreChange() {
		var store = getCookie("storeName");
		if (store != '' && store != this.state.storeName) {
			this.setState({ storeName: getCookie("storeName") });
		}
	}

	private logout = () => {
		let token = sessionStorage.getItem("token");
		DataAccess.clearCookies();
		sessionStorage.clear();

		fetch(`${apiAddress}/api/Users/logout`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({token})
		})
			.then(() => document.location.href = "/login")
	};

	private toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
}