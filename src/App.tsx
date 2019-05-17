import * as React from "react"

import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";


import { HashRouter as Router, Route, Link } from "react-router-dom"

import CartView from "./Cart"

import "./App.css";

type Props = {};

type State = {
  isOpen: boolean;
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar color="faded" light={true} expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar={true}>
              <Nav className="ml-auto" navbar={true}>
                <NavItem>
                  <NavLink tag={Link} to="/">Shopping Cart</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Container>
            <h2><i className="fa fa-shopping-cart"></i> React MobX Shopping Cart</h2>
            <Row>
              <Col>
                <Route exact path="/" component={CartView} />
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
