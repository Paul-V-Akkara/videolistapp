import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoListApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<VideoListApp />, document.getElementById('root'));
registerServiceWorker();
