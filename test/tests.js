const assert = require('assert');
const fs = require('fs');
const j2ts = require('../index');

const SAMPLES_DIR = `${__dirname}/../samples`;

describe('j2ts', function() {

    it('should generate Simple ts', function(onDone) {
        j2ts(`${SAMPLES_DIR}/Simple.class`)
            .then(res => assert.equal(res[0].str, fs.readFileSync(`${SAMPLES_DIR}/${res[0].name}.ts`, {encoding: 'utf8'})))
            .then(onDone, onDone);
    });

    it('should generate Primitifs ts', function(onDone) {
        j2ts(`${SAMPLES_DIR}/Primitifs.class`)
            .then(res => assert.equal(res[0].str, fs.readFileSync(`${SAMPLES_DIR}/${res[0].name}.ts`, {encoding: 'utf8'})))
            .then(onDone, onDone);
    });

    it('should generate Other ts', function(onDone) {
        j2ts(`${SAMPLES_DIR}/Other.class`)
            .then(res => assert.equal(res[0].str, fs.readFileSync(`${SAMPLES_DIR}/${res[0].name}.ts`, {encoding: 'utf8'})))
            .then(onDone, onDone);
    });

    it('should generate Hierarchy ts', function(onDone) {
        j2ts(`${SAMPLES_DIR}/hierarchy/*.class`)
            .then(res => res.forEach(r => assert.equal(r.str, fs.readFileSync(`${SAMPLES_DIR}/hierarchy/${r.name}.ts`, {encoding: 'utf8'}))))
            .then(onDone, onDone);
    });

    it('should generate generic ts', function(onDone) {
        j2ts(`${SAMPLES_DIR}/Generic.class`)
            .then(res => {
                console.log(res[0].str);
                console.log(fs.readFileSync(`${SAMPLES_DIR}/${res[0].name}.ts`, {encoding: 'utf8'}));
                return res;
            })
            .then(res => assert.equal(res[0].str, fs.readFileSync(`${SAMPLES_DIR}/${res[0].name}.ts`, {encoding: 'utf8'})))
            .then(onDone, onDone);
    });

});

