import { CommonActions } from '@react-navigation/native';
import React from 'react';

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function navigateWithReset(name, params = {}) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    }),
  );
}

export {
  navigationRef,
  navigate,
  navigateWithReset,
};
