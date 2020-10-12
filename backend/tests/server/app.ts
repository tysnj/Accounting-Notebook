import chai = require('chai');
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

import { createAppServer } from '../../src/server/appServer';
import { Balance } from '../../src/models/Balance';

const balance = new Balance()
const appServer = createAppServer(balance);

describe('Root endpoint', async () => {
  it('Should return response on call', async () => {
    const request = chai.request(appServer).get('/');
    const response = await request;

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Server is alive');
  })
});
