/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, useEffect, getResult } from '@ocdla/view';
import Sidebar from '@ocdla/global-components/src/Sidebar';
import './chapter.css';
// import Body from '@ocdla/global-components/src/Body';

/* eslint-enable */
import {
    getSections,
    getBody,
    getChapter,
    getSidebarSecond
} from '../functions/ors/fetch_data.js';

export default function Chapter({ chapter }) {
    // useEffect assigns a function (to be executed on each render) to a key.
    // The key can be used in getResult(key) to get the result of the function.
    useEffect('theChapter', async function () {
        return await getBody(chapter);
    });

    useEffect('sidebarFirst', async function () {
        return await getSections(chapter, true);
    });

    useEffect('sidebarSecond', async function () {
        return await getSidebarSecond(chapter, true);
    });

    let chapterContents = getResult('theChapter');
    let sidebarFirst = getResult('sidebarFirst');
    let sidebarSecond = getResult('sidebarSecond');

    let title = getChapter(chapter).getAttribute('name');

    /** From React grammar for using innerHTML:
     *             <div dangerouslySetInnerHTML={
                { __html: htmlContent }
             } />
     */
    return (
        <div class='lg:grid lg:grid-cols-6'>
            <Sidebar
                type='left'
                items={sidebarFirst}
            />

            <section
                id='body'
                class='flex w-full flex-col gap-4 p-4 lg:col-span-4 lg:col-start-2 lg:me-auto lg:border-x lg:p-8 [&_*]:mb-4'>
                <h1 class='text-2xl font-bold'>
                    Chapter {chapter}
                    <br />
                    {title}
                </h1>
                <div dangerouslySetInnerHTML={chapterContents}></div>{' '}
            </section>
            {/* <Body
                dangerouslySetInnerHTML={body}
                typeOrs={typeOrs}
            /> */}
            <Sidebar
                type='right'
                items={sidebarSecond}
            />
        </div>
    );
}
