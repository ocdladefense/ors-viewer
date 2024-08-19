import Url from '@ocdla/lib-http/Url';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
// import Outline from '@ocdla/ors/src/Outline';
import Items_Breadcrumbs_Books_Online from '../../data/json/books_online/breadcrumbs/items.json';
import Items_Breadcrumbs_Ors_Viewer from '../../data/json/ors_viewer/breadcrumbs/items.json';
import Items_Sidebar_Left_Books_Online from '../../data/json/books_online/sidebar_left/items.json';
import Items_Sidebar_Left_Ors_Viewer from '../../data/json/ors_viewer/sidebar_left/items.json';
import Items_Sidebar_Right_Books_Online from '../../data/json/books_online/sidebar_right/items.json';
import Items_Sidebar_Right_Ors_Viewer from '../../data/json/ors_viewer/sidebar_right/items.json';

export const fetch_items_statutes_volumes = async () => {
    const client = new HttpClient();
    const req = new Request('https://ors.ocdla.org/index.xml');
    // const req = new Request(
    //     'https://raw.githubusercontent.com/ocdladefense/ors-viewer/toc/src/data/xml/ors_viewer/statutes.xml'
    // );
    const resp = await client.send(req);
    const xml = await resp.text();
    const parser = new DOMParser();
    const parsedXML = parser.parseFromString(xml, 'application/xml');
    const xmlVolumes = parsedXML.getElementsByTagName('volume');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlVolumes).forEach(volume => {
        const volumeId = volume.getAttribute('id').split('-')[1];
        const volumeHref = baseUrl + '/ors_volume_' + volumeId;
        const volumeName = volume.getAttribute('name');
        const volumeVolumes = volume.getElementsByTagName('title');
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

export const fetch_items_statutes_volume_titles = async currentVolume => {
    const client = new HttpClient();
    const req = new Request('../../data/xml/ors_viewer/statutes.xml');
    // const req = new Request(
    //     'https://raw.githubusercontent.com/ocdladefense/ors-viewer/toc/src/data/xml/ors_viewer/statutes.xml'
    // );
    const resp = await client.send(req);
    const xml = await resp.text();
    const parser = new DOMParser();
    const parsedXML = parser.parseFromString(xml, 'application/xml');
    const xmlVolumes = parsedXML.getElementsByTagName('volume');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlVolumes).forEach(volume => {
        const volumeId = volume.getAttribute('id').split('-')[1];
        const volumeTitles = volume.getElementsByTagName('title');

        if (parseInt(volumeId) === currentVolume) {
            Array.from(volumeTitles).forEach(title => {
                const titleId = title.getAttribute('id').split('-')[1];
                const titleHref = baseUrl + '/ors_title_' + titleId;
                const titleName = title.getAttribute('name');
                const titleChapterRange =
                    'Chapters ' + title.getAttribute('range');

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

export const fetch_items_statutes_title_chapters = async currentTitle => {
    const client = new HttpClient();
    const req = new Request('../../data/xml/ors_viewer/statutes.xml');
    // const req = new Request(
    //     'https://raw.githubusercontent.com/ocdladefense/ors-viewer/toc/src/data/xml/ors_viewer/statutes.xml'
    // );
    const resp = await client.send(req);
    const xml = await resp.text();
    const parser = new DOMParser();
    const parsedXML = parser.parseFromString(xml, 'application/xml');
    const xmlTitles = parsedXML.getElementsByTagName('title');
    const baseUrl = '/statutes';
    let jsonArray = [];

    Array.from(xmlTitles).forEach(title => {
        const titleId = title.getAttribute('id').split('-')[1];
        const titleChapters = title.getElementsByTagName('chapter');

        if (parseInt(titleId) === currentTitle) {
            Array.from(titleChapters).forEach(chapter => {
                const chapterId = chapter.getAttribute('id').split('-')[1];
                const chapterHref = baseUrl + '/ors_chapter_' + chapterId;
                const chapterName = chapter.getAttribute('name');

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

export const fetch_items_statutes_chapter_sections = async currentChapter => {
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
            const jsonArray = xml.sectionTitles.map((section, i) => {
                const chapterString =
                    xml.chapterNum + '.' + i.toString().padStart(3, '0');

                return {
                    id: chapterString,
                    active: i === currentChapter ? true : undefined,
                    href: '?chapter=' + xml.chapterNum + '#section-' + i,
                    label: section
                };
            });

            return jsonArray;
    }
};

export const fetch_items_breadcrumbs_books_online = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Breadcrumbs_Books_Online;
        // Production
        default:
            const baseUrl = '/';

            return [
                {
                    href: baseUrl,
                    label: 'Books Online'
                },
                {
                    href: baseUrl,
                    label: 'Felony Sentencing in Oregon'
                }
            ];
    }
};

export const fetch_items_breadcrumbs_ors_viewer = async (
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

export const fetch_sidebar_left_books_online = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Left_Books_Online;
        // Production
        default:
            const client = new HttpClient();
            const req = new Request('../../data/xml/books_online/books.xml');
            // const req = new Request(
            //     'https://raw.githubusercontent.com/ocdladefense/books-online/table-of-contents/src/js/mock/mock-data/books.xml'
            // );
            const resp = await client.send(req);
            const xml = await resp.text();
            const parser = new DOMParser();
            const parsedXML = parser.parseFromString(xml, 'application/xml');
            const xmlParts = parsedXML.getElementsByTagName('part');
            const xmlChapters = parsedXML.getElementsByTagName('chapter');
            const xmlAppendixes = parsedXML.getElementsByTagName('appendix');
            let jsonArray = [];
            const baseUrl = 'https://pubs.ocdla.org/fsm/';

            Array.from(xmlParts).forEach(part => {
                const partLabel = part.getAttribute('label');
                const partHref =
                    baseUrl + partLabel.toLowerCase().replace(/\s+/g, '-');

                jsonArray.push({
                    href: partHref,
                    heading: partLabel,
                    label: ''
                });
            });

            Array.from(xmlChapters).forEach(chapter => {
                const chapterLabel = chapter.getAttribute('label');
                const chapterHref = baseUrl + chapterLabel.split(' ')[1];
                const chapterName = chapter.getAttribute('name');

                jsonArray.push({
                    href: chapterHref,
                    heading: chapterLabel,
                    label: chapterName
                });
            });

            Array.from(xmlAppendixes).forEach(appendix => {
                const appendixLabel = appendix.getAttribute('label');
                const appendixHref =
                    baseUrl +
                    'appendix-' +
                    appendixLabel.split(' ')[1].toLowerCase();

                jsonArray.push({
                    href: appendixHref,
                    heading: appendixLabel,
                    label: ''
                });
            });

            return jsonArray;
    }
};

export const fetch_sidebar_left_ors_viewer = async currentChapter => {
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
    }
};

export const fetch_body_ors_viewer = async currentChapter => {
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

export const fetch_sidebar_right_books_online = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Right_Books_Online;
        /*
            Production

            WIP for dynamic fetching.
        */
        default:
            const baseUrl = '/';

            return [
                {
                    href: baseUrl,
                    label: '§ 1-1.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.2. Punishment and Public Safety.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.3. Presumptive Punishments.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.4. Basic Guidelines Principles.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-2.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.1. Guidelines Amendments.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.2. OAR 213-001-0000 Notice Rule for Rulemaking.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.3. OAR 213-001-0005 Rulemaking Procedure.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.1 Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.2. Date of Felony Uncertain.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.3. OAR 213-009-0002 Defendants Found Guilty Except for Insanity.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.4. Juvenile Defendants.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-5.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-6.1. Effect of Guidelines’ Commentary and Staff Advisories.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.1. General Attacks.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.2. Specific Attacks—Jury Trial Rights.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.3. Specific Attacks—Due Process.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.4. Specific Attacks—Notice of Intent to Prove Enhancement Facts.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.5. Specific Attacks—Right Against Self-Incrimination.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.6. Specific Attacks—Double Counting.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.7. Specific Attacks—Confrontation.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.8. Specific Attacks—Record of Prior Convictions.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.9. Specific Attacks—Separate Criminal Episode Findings.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.10. Ad Hoc Application of Sentencing Schemes.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.11. Specific Attacks—Speedy Trial.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.12. Specific Attacks—Special State Constitutional Provisions.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-8.1. Limitations on Money Judgments.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                }
            ];
    }
};

export const fetch_sidebar_right_ors_viewer = async currentChapter => {
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
    }
};
