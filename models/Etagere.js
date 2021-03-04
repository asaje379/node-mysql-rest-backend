const model = require("./base/model.generator");

const Etagere = model('etageres', [
    { name: 'numero', type: 'int', null: false, unique: true }
]);
module.exports = Etagere;