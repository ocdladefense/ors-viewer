/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Breadcrumbs() {
    return (
        <section class='flex items-center p-4 xl:h-16'>
            <div class='container mx-auto'>
                /{' '}
                <Hyperlink
                    href='https://oregon.public.law/statutes'
                    body='ORS'
                />{' '}
                /{' '}
                <Hyperlink
                    href='https://oregon.public.law/statutes/ors_volume_1'
                    body='
                    Vol. 1
                '
                />{' '}
                /{' '}
                <Hyperlink
                    href='https://oregon.public.law/statutes/ors_title_1'
                    body='
                    Title 1
                '
                />{' '}
                /{' '}
                <Hyperlink
                    href='https://oregon.public.law/statutes/ors_chapter_1'
                    body='
                    Chap. 1. Courts & Judicial Officers Generally
                '
                />{' '}
                / § 1.001
            </div>
        </section>
    );
}
