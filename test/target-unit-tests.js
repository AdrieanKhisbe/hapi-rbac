'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;

const expect = Code.expect;

const Rbac = require('../');


experiment('Target unit tests (all-of)', () => {

    var target = ['all-of', { type: 'group', value: 'writer' }, { type: 'premium', value: true }];

    test('should apply (full match)', (done) => {

        var information = {
            username: 'user00001',
            group: ['writer'],
            premium: true
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(true);

            done();
        });
    });

    test('should not apply (partial match)', (done) => {

        const information = {
            username: 'user00002',
            group: ['writer'],
            premium: false
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(false);

            done();
        });
    });

    test('should not apply (no match)', (done) => {

        const information = {
            username: 'user00003',
            group: ['reader'],
            premium: false
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(false);

            done();
        });
    });

});

experiment('Target unit tests (any-of)', () => {

    const target = ['any-of', { type: 'group', value: 'writer' }, { type: 'premium', value: true }, {
        type: 'username',
        value: 'user00002'
    }];

    test('should apply (partial match)', (done) => {

        const information = {
            username: 'user00001', // do not match
            group: ['writer'],
            premium: true
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(true);

            done();
        });
    });

    test('should apply (full match)', (done) => {

        const information = {
            username: 'user00002',
            group: ['writer'],
            premium: true
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(true);

            done();
        });
    });

    test('should not apply (no match)', (done) => {

        const information = {
            username: 'user00003',
            group: ['reader'],
            premium: false
        };

        Rbac.evaluateTarget(target, information, (err, applies) => {

            expect(err).to.not.exist();

            expect(applies).to.exist().and.to.equal(false);

            done();
        });
    });

});
