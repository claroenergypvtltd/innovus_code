import React, { Component } from 'react';
import logo_black from '../assets/images/Agro_logo.png';
import notifi from '../assets/images/notification_icon.png';
import user from '../assets/images/Dashboard/avatar.png';

export class Header extends Component {
  render() {
    return (
      <div className="main-header container-fluid p-0">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand header-logo">
            <img alt="Brand" className="wt-logo" src={logo_black} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="header-right ml-auto">
              <li className="notify-sec">
                <a>
                  <img src={notifi} />
                  <span className="notify-badge"></span>
                </a>
              </li>
              <li className="profile-sec">
                <a>
                  <img src={user} />
                  <span className="user-name" onClick={this.props.logOut}>
                    SignOut
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
