import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.appSetting.list })
    }

    render() {
        return (
            <div>
                <h4 className="user-title">{window.strings.ABOUT.ABOUT_US}</h4>
                <div className="main-wrapper">
                    <div className="about-text d-flex col-md-7">
                        <div className="container ml-0">
                            <p>It is a long established fact that a reader will be distracted by
                            the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using 'Content here, content here',
                            making it look like readable English</p>
                            <p>Many desktop publishing packages and web page editors now use
                            Lorem Ipsum as their default model text, and a search for
                            'lorem ipsum' will uncover many web sites still in their infancy.
                            Various versions have evolved over the years, sometimes by accident,
                            sometimes on purpose (injected humour and the like).</p>
                        </div>
                    </div>
                    <div className="about-text d-flex col-md-7">
                        <div className="container ml-0">
                            <h4 className="user-title">{window.strings.ABOUT.REGISTERED_ADDRESS}</h4>
                            <p className="reg-text">In case of any query or complaint, write us at
                                mail@gmail.com or call<button type="button" class="btn btn-outline-info"><i class="fas fa-phone pr-2"></i>Customer Support</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="back-btn mt-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>

            </div>
        )
    }
}