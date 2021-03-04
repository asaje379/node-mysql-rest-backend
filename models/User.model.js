const model = require("./base/model.generator");

const User = model('users', [
    { name: 'email', type: 'string', null: false },
    { name: 'password', type: 'string', null: false }
]);

module.exports = User;