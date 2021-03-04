module.exports = {};
const _FOREIGNS = {};
const _REVERSE_FOREIGNS = {};

const addForeign = (oneModel, manyModel) => {
    const name = manyModel.name;
    const rname = oneModel.name

    if (!_FOREIGNS.hasOwnProperty(rname)) {
        _FOREIGNS[rname] = [];
    }

    if (!_REVERSE_FOREIGNS.hasOwnProperty(name)) {
        _REVERSE_FOREIGNS[name] = [];
    }

    _FOREIGNS[rname].push({
        fk: name.substr(0, name.length - 1) + 'Id',
        model: manyModel
    });

    _REVERSE_FOREIGNS[name].push({
        model: oneModel,
        rfk: rname,
        fk: name.substr(0, name.length - 1) + 'Id',
    });
};


function foreign(OneModel, ManyModel) {
    OneModel.belongsTo(ManyModel);
    ManyModel.hasMany(OneModel);
    addForeign(OneModel, ManyModel);
}

module.exports.foreign = foreign;
module.exports.getForeigns = _ => _FOREIGNS;
module.exports.getReverseForeigns = _ => _REVERSE_FOREIGNS;