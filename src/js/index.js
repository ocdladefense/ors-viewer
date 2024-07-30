import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
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

let msword = await OrsChapter.fromResponse(resp);
msword.chapterNum = 1;

let xml = OrsChapter.toStructuredChapter(msword);
// Inspect the available properties for use in building section outline (left nav) and content.
// section outline (left nav) is listed in sectionTitles property.
// xml.doc contains the entire document.
// xml.toString() will return the entire document as an HTML string for use with innerHTML.
console.log(xml);
console.log(xml.doc);

let html = xml.toString();

const root = View.createRoot($body);
// const root = View.createRoot('#root');

root.render(<App />); // JSX Tests
