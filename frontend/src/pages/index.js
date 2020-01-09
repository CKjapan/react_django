import React from 'react';
import ReactDOM from 'react-dom';
import App from './routing';//追加
import * as serviceWorker from '../serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));//ok

serviceWorker.unregister();