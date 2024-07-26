/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function Hyperlink({ extraClasses, href, body }) {
    return (
        <a
            class={`${extraClasses !== undefined ? extraClasses : 'hover:underline-blue-500 text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-2'}`}
            href={href}>
            {body}
        </a>
    );
}
