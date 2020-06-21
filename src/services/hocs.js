import React from 'react';
import {connect} from 'react-redux';

export function withAuth(FirstComponent, SecondComponent) {
  function Authentication(props) {
    return (
      <>{props.isAuthorized ? <FirstComponent {...props} /> : <SecondComponent {...props} />}</>
    );
  }

  const mapStateToProps = ({currentUser}) => {
    const {isAuthorized} = currentUser;
    return {isAuthorized};
  };

  return connect(mapStateToProps)(Authentication);
}
