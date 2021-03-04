const emailCtrl = require("../controllers/EmailController");
const ctrl = require("../controllers/ModelController");
const uploadCtrl = require("../controllers/UploadController");
const Archive = require("../models/Archive.model");
const Etagere = require("../models/Etagere");
const User = require("../models/User.model");

const routes = [
    {
        path: '/archives',
        model: Archive
    },
    {
        path: '/users',
        model: User
    },
    {
        path: '/etageres',
        model: Etagere
    }
];

function createRoutes(app) {
    for (const item of routes) {
        app.use(item.path, ctrl(item.model));
    }
    app.use('/upload', uploadCtrl());
    app.use('/email', emailCtrl());
}

module.exports = createRoutes;