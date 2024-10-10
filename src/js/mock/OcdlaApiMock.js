/**
 * @fileoverview This file checks whether the ORS Viewer application is being hosted locally or remotely (basically CORS checks) to return appropriate data accordingly.
 */

import HttpMock from '@ocdla/lib-http/HttpMock';
import Url from '@ocdla/lib-http/Url';
import volumes from '../../data/xml/ors_viewer/statutes.xml';
import {ReferenceParser} from "@ocdladefense/ors/src/ReferenceParser.js";
/*
window.parseChapterAndSection = parseChapterAndSection;
window.parseSubsections = parseSubsections;
window.parseReferences = parseReferences;
window.toSelectors = toSelectors;
window.WebcOrs = WebcOrs;
*/


// https://appdev.ocdla.org/books-online/index.php?chapter=182
// https://www.law.cornell.edu/regulations/oregon/OAR-863-010-0610

  
  // Translate the reference into matrixes.
  // Each target document (in this case an OrsChapter object) should know how to translate a matrix into selectors
  // valid for that document type.

export default class OcdlaApiMock extends HttpMock {
    constructor() {
        super();
    }

    getResponse(req) {
        const url = new Url(req.url);
        const query = url.query;

        let results = ReferenceParser.toMatrix(query.reference);
        let matrix = results.shift(); // We don't need the indicator bit for this implementation.
        let indicatorBit = matrix.shift();

        console.log(matrix);

        return Response.json(matrix.filter(x=> x !== null));
    }


}
