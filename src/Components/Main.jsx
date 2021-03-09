import React from 'react';
import { connect } from 'react-redux';

import Notes from './Notes';
import Info from './Info';

class Main extends React.Component {
  render() {
    return (
      this.props.page === 'notes' ? <Notes /> : <Info />
    );
  }
}

function mapStateToProps(state) {
  return { page: state.page };
}

export default connect(mapStateToProps)(Main)