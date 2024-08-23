/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import TableOfContents from './TableOfContents';
/* eslint-enable */
import { getTitles, getVolume } from '../functions/ors/fetch_data.js';

export default function TitlesToc({ volume }) {
    let entries = getTitles(volume);
    let title = 'VOLUME ' + volume;
    let subtitle = getVolume(volume).getAttribute('name');

    return (
        <TableOfContents
            division='Titles'
            title={title}
            subtitle={subtitle}
            entries={entries}
        />
    );
}
