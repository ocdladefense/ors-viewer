/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Sidebar from '@ocdla/global-components/src/Sidebar';
import Body from '@ocdla/global-components/src/Body';
/* eslint-enable */
import {
    getSections,
    getBody,
    getSidebarSecond
} from '../functions/ors/fetch_data.js';

// const sidebarFirst = window.location.pathname.includes('section')
const sidebarFirst = window.location.pathname.includes('chapter')
    ? await getSections(window.location.pathname.split('/').pop(), true)
    : null;

// console.log(window.location.pathname.split('/'));

// const sidebarSecond = window.location.pathname.includes('section')
const sidebarSecond = window.location.pathname.includes('chapter')
    ? await getSidebarSecond(window.location.pathname.split('/').pop(), true)
    : null;

export function body() {
    return getBody(window.location.pathname.split('/').pop());
}

export default function Ors_Body() {
    return (
        <div class='lg:grid lg:grid-cols-6'>
            <Sidebar
                type='left'
                items={sidebarFirst}
            />
            <Body body={body} />
            <Sidebar
                type='right'
                items={sidebarSecond}
            />
        </div>
    );
}
