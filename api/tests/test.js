// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("events", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all events", (done) => {
            chai.request(app)
                .get('/api/getEvents')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should return new event id", (done) => {
            chai.request(app)
                .post('/api/addEvent')
                .send({
                    event_id: '',
                    title: 'test',
                    desc: 'test',
                    startTime: '2019-05-01 00:00:00',
                    endTime: '2019-05-01 00:00:00',
                    all_day: false,
                    user_id: 33
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object').to.have.property('success');
                    res.body.should.be.a('object').to.have.property('insertId');
                    done();
                });
        });

    });
});

describe("items", () => {
    describe("GET getItems", () => {
        // Test to get all students record
        it("should return object with items getItems", (done) => {
            chai.request(app)
                .get('/api/getItems')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET newItem", () => {
        it("should return new item id", (done) => {
            chai.request(app)
                .post('/api/addItem')
                .send({
                    item_id: null,
                    item_name: 'qwe',
                    finished_by: null,
                    created_by: '',
                    created_at: '2019-05-22 19:01:22',
                    finished_at: null,
                    finished: false
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object').to.have.property('success');
                    res.body.should.be.a('object').to.have.property('insertId');
                    done();
                });
        });

    });
});


//Kalenderablauf
// 1. Füge einen Kalendereintrag hinzu
// 2. Füge einen ganztägigen Kalendereintrag hinzu
// 3. Verändere einen Kalendereintrag
// 4. Überprüfe alle Kalendereintrage ob sie korrekt sind
// 5. Versuche einen Kalendereintrag einzutrage wo schon einer existiert
// 6. Lösche alle Kalendereinträge
// 7. Überprüfe ob alle Kalendereinträge korrekt sind 