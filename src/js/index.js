import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import { OrsChapter } from '@ocdla/ors/src/OrsChapter';
import HttpClient from '@ocdla/lib-http/HttpClient';
import App from './App';
/* eslint-enable */

const $body = document.querySelector('body');

let url = new Url('https://appdev.ocdla.org/books-online/index.php');
url.addParam('chapter', '3');

let req = new Request(url.toString());

let client = new HttpClient();

let resp = await client.fetch(req);

let chapter = await OrsChapter.fromResponse(resp);
chapter.parse();
chapter.injectAnchors();

// let doc = await chapter.load(resp);

const root = View.createRoot($body);
// const root = View.createRoot('#root');

root.render(<App />); // JSX Tests
