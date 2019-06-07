import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedLogin, { Login } from './Login';
import { withMemoryRouter } from 'utils';

describe('<Login />', () => {
  const actions = {
    loginUser: jest.fn()
  };
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const RoutedLogin = withMemoryRouter(ConnectedLogin);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedLogin />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const emailAddress = 'some@one.org';
    const password = 'testing';
    const mockEvent = {
      preventDefault: jest.fn()
    };
    const component = renderer.create(<Login actions={actions} />);
    const { instance } = component.root.findByType(Login);

    expect(instance).toBeDefined();
    instance.handleTextChange({
      target: {
        name: 'emailAddress',
        value: emailAddress
      }
    });
    instance.handleTextChange({
      target: {
        name: 'password',
        value: password
      }
    });
    instance.handleSubmit(mockEvent);
    expect(actions.loginUser).toHaveBeenCalledWith(emailAddress, password);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('can handleTextChange', () => {});
});