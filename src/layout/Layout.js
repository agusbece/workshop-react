import React from 'react';
import { connect } from 'react-redux';
import Octicon from 'react-octicon';
import './Layout.scss';


const Layout = ({user, children}) => (
  <main>
    <header>
      <Octicon name='clock' mega spin />
      <h1>Foogl</h1>

      {user && <span>Hi {user.email}!</span>}

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
