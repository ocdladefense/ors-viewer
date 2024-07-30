/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Breadcrumbs({ type }) {
    return (
        <section class='container mx-auto flex items-center whitespace-pre border border-t-0 p-4 text-black lg:h-16'>
            <div class='container mx-auto flex items-center'>
                {type === 'books-online' ? (
                    // <div class='flex items-center gap-2'>
                    <>
                        <Hyperlink
                            type='standard'
                            href='/'
                            body='Books Online'
                        />{' '}
                        /{/* <div class='text-3xl'>&gt;</div>{' '} */}{' '}
                        <p>Felony Sentencing in Oregon</p>
                    </>
                ) : type === 'ors-viewer' ? (
                    <>
                        <Hyperlink
                            type='standard'
                            href='https://oregon.public.law/statutes'
                            body='ORS'
                        />{' '}
                        /{' '}
                        <Hyperlink
                            type='standard'
                            href='https://oregon.public.law/statutes/ors_volume_1'
                            body='
                    Vol. 1
                '
                        />{' '}
                        /{' '}
                        <Hyperlink
                            type='standard'
                            href='https://oregon.public.law/statutes/ors_title_1'
                            body='
                    Title 1
                '
                        />{' '}
                        /{' '}
                        <Hyperlink
                            type='standard'
                            href='https://oregon.public.law/statutes/ors_chapter_1'
                            body='
                    Chap. 1. Courts & Judicial Officers Generally
                '
                        />{' '}
                        / <p>§ 1.001</p>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
}
