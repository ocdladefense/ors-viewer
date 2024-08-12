import Url from '@ocdla/lib-http/Url';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
// import Outline from '@ocdla/ors/src/Outline';

export const fetch_breadcrumbs_ors_viewer = async (
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
) => {
    return [
        {
            href: '/statutes',
            label: 'ORS'
        },
        {
            href: '/statutes/ors_volume_' + currentVolume,
            label: 'Vol. ' + currentVolume
        },
        {
            href: '/statutes/ors_title_' + currentTitle,
            label: 'Title ' + currentTitle
        },
        {
            href: '/statutes/ors_chapter_' + currentChapter,
            label:
                'Chap. ' +
                currentChapter +
                '. Courts & Judicial Officers Generally'
        },
        {
            href: '/statutes/ors_' + currentSection,
            label: '§ ' + currentSection
        }
    ];
};

export const fetch_sidebar_left_ors_viewer = async currentChapter => {
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    // url.buildQuery('chapter', '1');
    // url.buildQuery('chapter', '2');
    url.buildQuery('chapter', currentChapter.toString());

    const req = new Request(url.toString());
    const client = new HttpClient();
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = currentChapter;

    const xml = OrsChapter.toStructuredChapter(msword);
    const jsonArray = xml.sectionTitles.map((label, section) => {
        const chapterString =
            xml.chapterNum + '.' + section.toString().padStart(3, '0');

        return {
            active: section === currentChapter ? true : undefined,
            // href: '/statutes/ors_' + chapterString,
            // href: `?chapter={chapterNum}#section-{sectionNum}`,
            // href: '#section-' + section,
            href: '?chapter=' + xml.chapterNum + '#section-' + section,
            heading: chapterString,
            label: label
        };
    });

    return jsonArray;
};

export const fetch_body_ors_viewer = async currentChapter => {
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    // url.buildQuery('chapter', '1');
    // url.buildQuery('chapter', '2');
    url.buildQuery('chapter', currentChapter.toString());

    const req = new Request(url.toString());
    const client = new HttpClient();
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = currentChapter;

    const xml = OrsChapter.toStructuredChapter(msword);

    return xml.toString();
};

export const fetch_sidebar_right_ors_viewer = async currentChapter => {
    return [
        // {
        //     href: '/',
        //     label: 'Current through early 2024'
        // },
        {
            href:
                'https://oregonlegislature.gov/bills_laws/ors/ors' +
                currentChapter.toString().padStart(3, '0') +
                '.html',
            label: '§ ' + currentChapter + '.001’s source a oregon​.gov'
        }
    ];
};
