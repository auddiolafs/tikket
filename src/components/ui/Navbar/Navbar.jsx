import { Menu, Container, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/auth';
import './Navbar.css'

// Navbar.jsx
// Navbar: Component
// @return jsx 
class Navbar extends Component {
  state = { activeItem: '' }

  // handleItemClick: function
  // @params1 e: event
  // @params2 name: string
  // @setState activeItem
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  // function: render
  // return jsx
  render() {
    // activeItem: string (default: '')
    const { activeItem } = this.state
    // admin: boolean (default: false)
    const { admin } = this.props;

    // return jsx
    return (
      <React.Fragment>
        <Menu size='large' fixed='top' secondary>
          <Container>
            <Menu.Item header name='Tikket'>
              <img alt='logo' src='/logo5.png' />
            </Menu.Item>
            <Menu.Item name='School'>
              Hörðuvallaskóli
          </Menu.Item>
            <Menu.Menu position='right'>
              {admin ? (
                <Menu.Item
                  as={NavLink}
                  to={'/admin'}
                  name='admin'
                  active={activeItem === 'admin'}
                  onClick={this.handleItemClick}
                >
                  Stjórnborð
        </Menu.Item>

              ) : null}
              <Menu.Item
                exact
                as={NavLink}
                to={'/'}
                name='tickets'
                active={activeItem === 'tickets'}
                className="inactive" activeClassName="active"
                onClick={this.handleItemClick}
              >
                Beiðnir
            </Menu.Item>
              <Menu.Item
                exact
                as={NavLink}
                to={'/profile'}
                name='user'
                active={activeItem === 'user'}
                onClick={this.handleItemClick}>
                <Icon name='user circle' />
              </Menu.Item>

              <Menu.Item name='sign-out' active={activeItem === 'sign-out'} onClick={this.props.signOut}>
                Útskrá
        </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </React.Fragment>
    )
  }
}

// mapDispatchToProps: function
// @props: dispatch
// @return dispatch action
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Navbar);