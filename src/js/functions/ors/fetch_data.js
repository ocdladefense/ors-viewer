import OrsMock from '../../mock/OrsMock';
import Url from '@ocdla/lib-http/Url';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsChapter from '@ocdla/ors/src/Chapter';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

const baseUrl = '/toc';
const client = new HttpClient();
const req = new Request('https://ors.ocdla.org/index.xml');
// const req = new Request(
//     'https://raw.githubusercontent.com/ocdladefense/ors-viewer/toc/src/data/xml/ors_viewer/statutes.xml'
// );
const resp = await client.send(req);
const xml = await resp.text();
const parser = new DOMParser();
const parsedXML = parser.parseFromString(xml, 'application/xml');

export const getVolume = paramId => {
    return parsedXML.getElementById('vol-' + paramId);
};

export const getTitle = paramId => {
    return parsedXML.getElementById('title-' + paramId);
};

export const getChapter = paramId => {
    return parsedXML.getElementById('ch-' + paramId);
};

export const getVolumes = () => {
    const xmlVolumes = parsedXML.getElementsByTagName('volume');
    let jsonArray = [];

    Array.from(xmlVolumes).forEach($volume => {
        const volumeId = $volume.getAttribute('id').split('-')[1];
        const volumeHref = baseUrl + '/volume/' + volumeId;
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

export const getTitles = paramId => {
    const xmlTitles = parsedXML.getElementsByTagName('title');
    let jsonArray = [];

    Array.from(xmlTitles).forEach($title => {
        const titleId = $title.getAttribute('id').split('-')[1];
        const titleHref = baseUrl + '/title/' + titleId;
        const titleName = $title.getAttribute('name');
        const titleChapterRange = 'Chapters ' + $title.getAttribute('range');
        const volumeId = $title.parentElement.getAttribute('id').split('-')[1];

        if (paramId === volumeId) {
            jsonArray.push({
                href: titleHref,
                id: titleId,
                heading: titleName,
                label: titleChapterRange
            });
        }
    });

    return jsonArray;
};

export const getChapters = paramId => {
    const xmlChapters = parsedXML.getElementsByTagName('chapter');
    let jsonArray = [];

    Array.from(xmlChapters).forEach($chapter => {
        const titleId = $chapter.parentElement.getAttribute('id').split('-')[1];
        const chapterId = $chapter.getAttribute('id').split('-')[1];
        const chapterHref = baseUrl + '/chapter/' + chapterId;
        const chapterName = $chapter.getAttribute('name');

        if (paramId === titleId) {
            jsonArray.push({
                href: chapterHref,
                id: chapterId,
                label: chapterName
            });
        }
    });

    return jsonArray;
};

export const getSections = async (paramId, fromSidebar) => {
    // const url = new Url('https://ors.ocdla.org/index.xml');
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    url.buildQuery('chapter', paramId.toString());

    const client = new HttpClient();
    const req = new Request(url.toString());
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);
    const xml = OrsChapter.toStructuredChapter(msword);
    let jsonArray = [];

    xml.sectionTitles.map(($section, sectionIndex) => {
        const chapterName = parsedXML
            .getElementById('ch-' + paramId)
            .getAttribute('name');
        const chapterString =
            paramId + '.' + sectionIndex.toString().padStart(3, '0');
        const matchFound = paramId === chapterString.split('.')[0];

        if (matchFound) {
            jsonArray.push({
                chapterName: chapterName,
                id: chapterString,
                active: fromSidebar
                    ? paramId.split('.')[1] === sectionIndex
                    : paramId === sectionIndex
                      ? true
                      : null,
                href: fromSidebar
                    ? '/chapter/' + paramId + '#section-' + sectionIndex
                    : '/chapter/' + paramId,
                heading: fromSidebar ? chapterString : null,
                label: $section
            });
        }
    });

    return jsonArray;
};

export const getBreadcrumbs = (type, paramId) => {
    let jsonArray = [];

    jsonArray.push({
        href: baseUrl,
        label: 'Ors'
    });

    switch (type) {
        case 'titles':
            jsonArray.push({
                href: baseUrl + '/volume/' + paramId,
                label: 'Vol. ' + paramId
            });
            break;
        case 'chapters':
            const title = getTitle(paramId);
            const volumeId = title.parentElement
                .getAttribute('id')
                .split('-')[1];

            jsonArray.push(
                {
                    href: baseUrl + '/volume/' + volumeId,
                    label: 'Vol. ' + volumeId
                },
                {
                    href: baseUrl + '/title/' + paramId,
                    label: 'Title ' + paramId
                }
            );
            break;
        case 'sections':
        case 'chapter':
            const chapter = getChapter(paramId);
            // const chapterId = chapter.getAttribute('id').split('-')[1];
            const chapterName = chapter.getAttribute('name');
            const titleId = chapter.parentElement.id.split('-')[1];
            const volumeId_3_4 =
                getTitle(titleId).parentElement.id.split('-')[1];

            jsonArray.push(
                {
                    href: baseUrl + '/volume/' + volumeId_3_4,
                    label: 'Vol. ' + volumeId_3_4
                },
                {
                    href: baseUrl + '/title/' + titleId,
                    label: 'Title ' + titleId
                },
                {
                    href: baseUrl + '/chapter/' + paramId,
                    label: 'Chap. ' + paramId + '. ' + chapterName
                }
                // {
                //     href: '/chapter#section-0',
                //     label: '§ ' + chapterId + '.0'
                // }
            );

            break;
    }

    return jsonArray;
};

export const getBody = async paramId => {
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    url.buildQuery('chapter', paramId.toString());

    const client = new HttpClient();
    const req = new Request(url.toString());
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = paramId;

    const xml = OrsChapter.toStructuredChapter(msword);

    return xml.toString();
};

export const getSidebarSecond = async paramId => {
    return [
        // {
        //     href: '/',
        //     label: 'Current through early 2024'
        // },
        {
            href:
                'https://oregonlegislature.gov/bills_laws/ors/ors' +
                paramId.toString().padStart(3, '0') +
                '.html',
            label: '§ ' + paramId + '.001’s source at oregon​.gov'
        }
    ];
};
