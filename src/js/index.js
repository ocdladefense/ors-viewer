import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
/* eslint-enable */

const $body = document.querySelector('body');
const root = View.createRoot($body);

root.render(
    <App
        view={root}
        appTypeCurrent={false}
    />
);
