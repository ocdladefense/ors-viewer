/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Statute from './Statute';
import Statute_Item from './Statute_Item';
/* eslint-enable */

export default function TableOfContents({
    statutesTitle,
    subTitle,
    statuteTitle,
    statuteItems
}) {
    return (
        <div class='flex flex-col gap-8'>
            <div class='flex flex-col gap-2 p-4'>
                {statutesTitle ? (
                    <h3 class='p-4 text-center text-5xl font-black tracking-tighter'>
                        {statutesTitle}
                    </h3>
                ) : (
                    <></>
                )}
                {subTitle ? (
                    <h6 class='text-2xl font-thin'>{subTitle}</h6>
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
