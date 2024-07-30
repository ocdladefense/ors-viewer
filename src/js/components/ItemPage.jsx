/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function ItemPage({ active, href, heading, body }) {
    let a;
    let h1;
    let p;

    switch (active) {
        case true:
            a = 'text-white border-black bg-black';
            h1 = '';
            p = 'text-white';
            break;
        case undefined:
        case false:
            a = 'group hover:bg-neutral-100';
            h1 = 'text-blue-400 group-hover:text-blue-500';
            p = '';
            break;
    }

    return (
        <li>
            <a
                class={`flex border-b px-4 py-2 ${a}`}
                href={href}>
                <small>
                    <h1 class={`text-xl font-bold ${h1}`}>{heading}</h1>
                    {body ? <p class={p}>{body}</p> : <></>}
                </small>
            </a>
        </li>
    );
}
