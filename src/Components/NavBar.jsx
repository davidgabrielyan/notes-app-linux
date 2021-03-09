import React from'react';
import { connect } from 'react-redux';

import './components.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <button className='navbar-button' onClick={() => this.props.changePage('notes')}>Notes</button>
        <button className='navbar-button' onClick={() => this.props.changePage('info')}>Info</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePage: (value) => dispatch({ type: 'page-changed', payload: { value } })
  }
}


export default connect(null, mapDispatchToProps)(NavBar)