/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import TableOfContents from './TableOfContents';
/* eslint-enable */
import { getVolumes } from '../functions/ors/fetch_data.js';

export default function VolumesToc() {
    let entries = getVolumes();

    return (
        <TableOfContents
            division='Volumes'
            title='OREGON REVISED STATUTES'
            entries={entries}
        />
    );
}
