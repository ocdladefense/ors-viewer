/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Table_Of_Contents from './Table_Of_Contents';
/* eslint-enable */
import { getChapter, getSections } from '../functions/ors/fetch_data.js';

export default function Sections_Toc({ division, chapter }) {
    const _chapter = 'CHAPTER ' + chapter;
    const subtitle = getChapter(chapter).getAttribute('name');
    const entries = getSections(chapter);
    // const entries = [];

    return (
        <Table_Of_Contents
            division={division}
            title={_chapter}
            subtitle={subtitle}
            entries={entries}
        />
    );
}
