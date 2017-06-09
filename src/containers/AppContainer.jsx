import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import Header from 'components/Header';

@connect(state => ({ state }))
export default class AppContainer extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Header />
        App Container
        <p onClick={() => this.props.dispatch(push("/login"))}>Go to login container with Push</p>
        <Link to={`/login`}>Go to login container with Link</Link>
      </div>
    );
  }

}
