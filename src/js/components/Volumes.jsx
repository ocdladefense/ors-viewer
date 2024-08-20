/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Statute from './Statute';
import Statute_Item from './Statute_Item';
/* eslint-enable */

export default function Volumes({ title, subtitle, heading, statuteItems }) {
    return (
        <div class='flex flex-col gap-8'>
            <div class='flex flex-col gap-2 p-4'>
                {title ? (
                    <h3 class='p-4 text-center text-5xl font-black tracking-tighter'>
                        {title}
                    </h3>
                ) : (
                    <></>
                )}
                {subtitle ? (
                    <h6 class='text-2xl font-thin'>{subtitle}</h6>
                ) : (
                    <></>
                )}
            </div>
            <Statute title={statuteTitle}>
                {statuteItems.map(item => (
                    <Statute_Item {...item} />
                ))}
            </Statute>
        </div>
    );
}
