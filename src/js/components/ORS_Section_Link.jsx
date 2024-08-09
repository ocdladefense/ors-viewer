/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
// import { baseStyleLink } from './Base_Content';
/* eslint-enable */

export default function ORS_Section_Link({
    href,
    heading,
    label,
    active = false
}) {
    let a = 'group hover:bg-neutral-100';
    let h = 'text-blue-400 group-hover:text-blue-500 ';
    let p = '';

    if (true === active) {
        a = 'text-white border-black bg-black';
        h = '';
        p = 'text-white';
    }

    return (
        <li>
            <a
                class={`${a} flex flex-col gap-2 border-b px-4 py-2`}
                href={href}>
                <h1 class={`${h}font-bold`}>{heading}</h1>
                <p class={p}>{label}</p>
            </a>
        </li>
    );
}
