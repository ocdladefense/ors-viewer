/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Sidebar from '@ocdla/global-components/src/Sidebar';
import Body from '@ocdla/global-components/src/Body';
/* eslint-enable */
import {
    getSidebarFirstItems,
    getBody,
    getSidebarSecondItems
} from '../functions/ors/fetch_data.js';

export default function Ors_Body({ section }) {
    // console.log('Ors_Body: ' + section);
    // const sidebarFirstItems = getSidebarFirstItems(currentChapter);
    const body = getBody(section, false);
    // const sidebarSecondItems = getSidebarSecondItems(currentChapter);
    // console.log('Ors_Body: ' + body);

    return (
        <div class='lg:grid lg:grid-cols-6'>
            {/* {/* <Sidebar
                type='left'
                items={sidebarFirstItems}
            /> */}
            <Body body={body} />
            {/* <Sidebar
                type='right'
                items={sidebarSecondItems}
            /> */}
        </div>
    );
}
