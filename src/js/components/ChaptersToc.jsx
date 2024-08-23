/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import TableOfContents from './TableOfContents';
/* eslint-enable */
import { getTitle, getChapters } from '../functions/ors/fetch_data.js';

export default function TitlesToc({ title }) {
    let _title = 'TITLE ' + title;
    let subtitle = getTitle(title).getAttribute('name');
    let entries = getChapters(title);

    return (
        <TableOfContents
            division='Chapters'
            title={_title}
            subtitle={subtitle}
            entries={entries}
        />
    );
}
