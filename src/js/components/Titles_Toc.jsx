/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Table_Of_Contents from './Table_Of_Contents';
/* eslint-enable */
import { getTitles, getVolume } from '../functions/ors/fetch_data.js';

export default function Titles_Toc({ division, volume }) {
    const entries = getTitles(volume);
    const title = 'VOLUME ' + volume;
    const subtitle = getVolume(volume).getAttribute('name');

    return (
        <Table_Of_Contents
            division={division}
            title={title}
            subtitle={subtitle}
            entries={entries}
        />
    );
}
