import {createStore} from 'redux';
import myReducer from './reducers/index';
import App from './App';
import {Provider} from 'react-redux';
import ReactDOM from "react-dom";

const store = createStore(
    myReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (document.getElementById('example')) {
    ReactDOM.render(
        <Provider store = { store }>
            <App/>
        </Provider>,
        document.getElementById('example'));
}
