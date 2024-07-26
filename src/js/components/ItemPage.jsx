/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function ItemPage({ active, href, heading, body }) {
    let li;
    let h1;
    let p;

    switch (active) {
        case true:
            li = 'border text-white border-black bg-black';
            h1 = '';
            p = 'text-white';
            break;
        case undefined:
        case false:
            li = 'group hover:bg-[#c0b3a0] border-r';
            h1 = 'text-blue-400 group-hover:text-black';
            p = '';
            break;
    }

    return (
        <li class={`px-4 py-2 ${li}`}>
            <a href={href}>
                <small>
                    <h1 class={`text-xl font-bold ${h1}`}>{heading}</h1>
                    <p class={p}>{body}</p>
                </small>
            </a>
        </li>
    );
}
