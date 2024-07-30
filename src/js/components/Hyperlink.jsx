/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function Hyperlink({ type, extraClasses, href, body }) {
    let classes;

    switch (type) {
        case 'standard':
            classes =
                'hover:underline-blue-500 text-blue-400 hover:opacity-[67.5%] hover:underline hover:underline-offset-2';
            break;
        case 'navbar-link':
            classes =
                'text-nowrap text-neutral-500 hover:opacity-[67.5%] hover:underline hover:underline-offset-2 -ms-4 lg:m-0 px-4 py-8';
            break;
        case 'navbar-dropdown':
            classes =
                'border border-t-0 hover:border-neutral-200 bg-neutral-50 px-12 py-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600';
            break;
        case 'navbar-brand':
            classes = 'p-4 lg:py-8 -m-4';
            break;
        case 'navbar-button-feedback':
            classes =
                'bg-blue-600 hover:bg-blue-500 text-white border-blue-600 hover:border-blue-500 px-4 py-2 rounded-md';
            break;
        case 'body-button':
            classes =
                'border border-blue-600 hover:opacity-[67.5%] text-blue-600 px-4 py-2 rounded-md contrast-[0] saturate-0';
            break;
        case 'footer-social':
            classes = 'hover:opacity-[67.5%]';
            break;
    }

    return (
        <a
            class={`${classes}${extraClasses ?? ''}`}
            href={href}>
            {body}
        </a>
    );
}
