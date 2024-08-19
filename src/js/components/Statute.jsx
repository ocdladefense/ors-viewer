/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function Statute({ title, children }) {
    return (
        <ul>
            <li>
                <h1 class='p-4 text-3xl font-bold'>{title}</h1>
            </li>
            <li>
                <hr />
            </li>
            <li>
                <ul class='lg:grid lg:grid-flow-row lg:grid-cols-2 [&>*:nth-child(2n):last-child]:border-b-0 [&>*:nth-child(2n+1):nth-last-child(-n+2)]:border-b-0 [&>*:nth-child(2n+1)]:border-r [&>*]:border-b'>
                    {children}
                </ul>
            </li>
        </ul>
    );
}
