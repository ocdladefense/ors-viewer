import HttpMock from '@ocdla/lib-http/HttpMock';
import Url from '@ocdla/lib-http/Url';
import statutes from '../../data/xml/ors_viewer/statutes.xml';

export default class OrsMock extends HttpMock {
    constructor() {
        console.log(statutes);

        super();
    }

    getResponse(req) {
        const url = new Url(req.url);
        const id = url.getPath();

        // Synesthetic responses.
        return id.includes('index')
            ? new Response(statutes, {
                  headers: { 'Content-Type': 'application/xml' }
              })
            : new Response(this.imports[id]);
    }
}
