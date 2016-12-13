import React from 'react';
import { connect } from 'react-redux';
import Octicon from 'react-octicon';
import './Layout.scss';

<<<<<<< HEAD
=======

>>>>>>> my-work
const Layout = ({user, children}) => (
  <main>
    <header>
      <Octicon name='clock' mega spin />
      <h1>Foogl</h1>
<<<<<<< HEAD
      {user && <span>Hi {user.email}!</span>}
=======

      {user && <span>Hi {user.email}!</span>}

>>>>>>> my-work
    </header>

    {children}
  </main>
);

Layout.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Layout);
