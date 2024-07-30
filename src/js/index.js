import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import { OrsChapter } from '@ocdla/ors/src/OrsChapter';
import HttpClient from '@ocdla/lib-http/HttpClient';
import Url from '@ocdla/lib-http/Url';
import App from './App';
/* eslint-enable */

const $body = document.querySelector('body');

let url = new Url('https://appdev.ocdla.org/books-online/index.php');
url.buildQuery('chapter', '1');

let req = new Request(url.toString());

let client = new HttpClient();

let resp = await client.send(req);

let chapter = await OrsChapter.fromResponse(resp).then(chapter => {
    chapter.parse();
    chapter.injectAnchors();
    return chapter;
});

console.log(chapter);

// let doc = await chapter.load(resp);

const root = View.createRoot($body);
// const root = View.createRoot('#root');

root.render(<App />); // JSX Tests
