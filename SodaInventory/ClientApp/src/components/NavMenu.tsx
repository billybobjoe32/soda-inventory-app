import * as React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/NavMenu.css';
import { getCookie, apiAddress } from '../store/DataAccess';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean, storeId: number, storeName: string }> {
    public state = {
		isOpen: false,
		storeId: 0,
		storeName: ''
	};

	componentDidMount() {
		//window.setInterval(this.checkStoreChange, 100);
	}

	public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/"><img src={require("../resources/logo.jpg")} width="75px" alt="logo" /></NavbarBrand>
						<label>{this.state.storeName}</label>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
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
		var store = getCookie("storeId");
		if (parseInt(store) != 0 && parseInt(store) != this.state.storeId) {
			fetch(apiAddress + '/api/Stores/' + store)
				.then(results => { return results.json(); })
				.then(data => {
					this.state.storeName = data.storeName;
				});
		}
	}

    private logout = () => {
        sessionStorage.clear();
    };

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
