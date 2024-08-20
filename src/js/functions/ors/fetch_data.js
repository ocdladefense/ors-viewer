import Url from '@ocdla/lib-http/Url';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
import Items_Breadcrumbs_Ors_Viewer from '../../../data/json/ors_viewer/breadcrumbs/items.json';
import Items_Sidebar_Left_Ors_Viewer from '../../../data/json/ors_viewer/sidebar_left/items.json';
import Items_Sidebar_Right_Ors_Viewer from '../../../data/json/ors_viewer/sidebar_right/items.json';
// import Outline from '@ocdla/ors/src/Outline';

const client = new HttpClient();
const req = new Request('https://ors.ocdla.org/index.xml');
// const req = new Request(
//     'https://raw.githubusercontent.com/ocdladefense/ors-viewer/toc/src/data/xml/ors_viewer/statutes.xml'
// );
const resp = await client.send(req);
const xml = await resp.text();
const parser = new DOMParser();
const parsedXML = parser.parseFromString(xml, 'application/xml');

export const getVolumes = async () => {
    const xmlVolumes = parsedXML.getElementsByTagName('volume');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlVolumes).forEach($volume => {
        const volumeId = $volume.getAttribute('id').split('-')[1];
        const volumeHref = baseUrl + '/ors_volume_' + volumeId;
        const volumeName = $volume.getAttribute('name');
        const volumeVolumes = $volume.getElementsByTagName('title');
        const volumeFirstChild = volumeVolumes[0];
        const volumeLastChild =
            volumeVolumes[Object.keys(volumeVolumes).at(-1)];
        // volumeVolumes[volumeVolumes.length - 1];
        const volumeChapterRange =
            'Chapters ' +
            volumeFirstChild.getAttribute('range').split('-')[0] +
            '-' +
            volumeLastChild.getAttribute('range').split('-')[1];

        jsonArray.push({
            href: volumeHref,
            id: volumeId,
            heading: volumeName,
            label: volumeChapterRange
        });
    });

    return jsonArray;
};

export const getTitles = async volume => {
    const xmlVolumes = parsedXML.getElementsByTagName('volume');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlVolumes).forEach($volume => {
        const volumeId = $volume.getAttribute('id').split('-')[1];
        const volumeTitles = $volume.getElementsByTagName('title');

        if (parseInt(volumeId) === volume) {
            Array.from(volumeTitles).forEach($title => {
                const titleId = $title.getAttribute('id').split('-')[1];
                const titleHref = baseUrl + '/ors_title_' + titleId;
                const titleName = $title.getAttribute('name');
                const titleChapterRange =
                    'Chapters ' + $title.getAttribute('range');

                jsonArray.push({
                    href: titleHref,
                    id: titleId,
                    heading: titleName,
                    label: titleChapterRange
                });
            });
        }
    });

    return jsonArray;
};

export const getChapters = async title => {
    const xmlTitles = parsedXML.getElementsByTagName('title');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlTitles).forEach($title => {
        const titleId = $title.getAttribute('id').split('-')[1];
        const titleChapters = $title.getElementsByTagName('chapter');

        if (parseInt(titleId) === title) {
            Array.from(titleChapters).forEach($chapter => {
                const chapterId = $chapter.getAttribute('id').split('-')[1];
                const chapterHref = baseUrl + '/ors_chapter_' + chapterId;
                const chapterName = $chapter.getAttribute('name');

                jsonArray.push({
                    href: chapterHref,
                    id: chapterId,
                    label: chapterName
                });
            });
        }
    });

    return jsonArray;
};

export const getSections = async chapter => {
    // const url = new Url('https://ors.ocdla.org/index.xml');
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    url.buildQuery('chapter', chapter.toString());

    const client = new HttpClient();
    const req = new Request(url.toString());
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = chapter;

    const xml = OrsChapter.toStructuredChapter(msword);
    const jsonArray = xml.sectionTitles.map(($section, sectionIndex) => {
        const chapterString =
            xml.chapterNum + '.' + sectionIndex.toString().padStart(3, '0');

        return {
            id: chapterString,
            active: sectionIndex === chapter ? true : undefined,
            href: '?chapter=' + xml.chapterNum + '#$section-' + sectionIndex,
            label: $section
        };
    });

    return jsonArray;
};

export const getBreadcrumbs = async (
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
) => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Breadcrumbs_Ors_Viewer;
        // Production
        default:
            const baseUrl = '/statutes';

            return [
                {
                    href: baseUrl,
                    label: 'Ors'
                },
                {
                    href: baseUrl + '/ors_volume_' + currentVolume,
                    label: 'Vol. ' + currentVolume
                },
                {
                    href: baseUrl + '/ors_title_' + currentTitle,
                    label: 'Title ' + currentTitle
                },
                {
                    href: baseUrl + '/ors_chapter_' + currentChapter,
                    label:
                        'Chap. ' +
                        currentChapter +
                        '. Courts & Judicial Officers Generally'
                },
                {
                    href: baseUrl + '/ors_' + currentSection,
                    label: '§ ' + currentSection
                }
            ];
    }
};

export const getSidebarFirstItems = async currentChapter => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Left_Ors_Viewer;
        // Production
        default:
            // const url = new Url('https://ors.ocdla.org/index.xml');
            const url = new Url(
                'https://appdev.ocdla.org/books-online/index.php'
            );

            url.buildQuery('chapter', currentChapter.toString());

            const client = new HttpClient();
            const req = new Request(url.toString());
            const resp = await client.send(req);
            const msword = await OrsChapter.fromResponse(resp);

            msword.chapterNum = currentChapter;

            const xml = OrsChapter.toStructuredChapter(msword);
            const jsonArray = xml.sectionTitles.map((label, section) => {
                const chapterString =
                    xml.chapterNum + '.' + section.toString().padStart(3, '0');

                return {
                    active: section === currentChapter ? true : undefined,
                    href: '?chapter=' + xml.chapterNum + '#section-' + section,
                    heading: chapterString,
                    label: label
                };
            });

            return jsonArray;

        //     : items_sidebar_left_ors_viewer.map(item => (
        //<ORS_Section_Link {...item} />
        //));
    }
};

export const getBody = async currentChapter => {
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    url.buildQuery('chapter', currentChapter.toString());

    const client = new HttpClient();
    const req = new Request(url.toString());
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = currentChapter;

    const xml = OrsChapter.toStructuredChapter(msword);

    return xml.toString();
};

export const getSidebarSecondItems = async currentChapter => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Right_Ors_Viewer;
        // Production
        default:
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

        // map here...
        //: items_sidebar_right_ors_viewer.map(item => (
        //    <Sidebar_Item {...item} />
        //));
    }
};
