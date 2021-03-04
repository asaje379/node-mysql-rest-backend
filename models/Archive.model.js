const { foreign } = require("./base/model.foreigns");
const model = require("./base/model.generator");
const Etagere = require("./Etagere");
const User = require("./User.model");

const Archive = model('archives', [
    { name: 'nom', type: 'string', null: false },
    { name: 'date', type: 'datetime' },
    { name: 'url', type: 'string' },
]);

foreign(Archive, User);
foreign(Archive, Etagere);

module.exports = Archive;