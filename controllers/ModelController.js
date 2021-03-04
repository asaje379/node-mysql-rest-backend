const express = require('express');
const { getForeigns, getReverseForeigns } = require('../models/base/model.foreigns');

function ctrl(Model) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const query = req.query;
            const foreigns = getForeigns();
            const rforeigns = getReverseForeigns();

            let data = await Model.findAll({
                where: {
                    ...query,
                    enabled: true
                }
            });

            if (foreigns.hasOwnProperty(Model.name)) {
                console.log(foreigns[Model.name]);
                for (const foreign of foreigns[Model.name]) {
                    const ForeignModel = foreign.model;
                    const fk = foreign.fk;
                    
                    let foreignsData = await ForeignModel.findAll({
                        where: {
                            enabled: true
                        }
                    });

                    data = JSON.parse(JSON.stringify(data));
                    foreignsData = JSON.parse(JSON.stringify(foreignsData));
                    
                    foreignsData.forEach(item => {
                        delete item[fk];
                    });

                    data = data.map(item => {
                        const newItem = { ...item };
                        newItem[fk.split('I')[0]] = foreignsData.find(it => it.id === item[fk]);
                        delete newItem[fk];
                        return newItem;
                    });
                }
            }

            if (rforeigns.hasOwnProperty(Model.name)) {
                for (const rforeign of rforeigns[Model.name]) {
                    const RForeignModel = rforeign.model;
                    const rfk = rforeign.rfk;
                    const fk = rforeign.fk;
                    
                    let rforeignsData = await RForeignModel.findAll({
                        where: {
                            enabled: true
                        }
                    });

                    data = JSON.parse(JSON.stringify(data));
                    rforeignsData = JSON.parse(JSON.stringify(rforeignsData));
                    
                    // rforeignsData.forEach(item => {
                    //     delete item[fk];
                    // });

                    data = data.map(item => {
                        const newItem = { ...item };
                        newItem[rfk] = rforeignsData.filter(it => it[fk] === item.id);
                        return newItem;
                    });
                }
            }

            res.status(200).json(data);
        } catch (e) {
            res.status(500).send('Impossible de lire les données: ' + e.message);
        }
    });

    router.get('/count', (req, res) => { });

    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Model.findByPk(id);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send('Impossible de lire la donnée : ' + e.message);
        }
    });

    router.post('/', async (req, res) => {
        try {
            const item = req.body;
            console.log('it: ', item);
            console.log(Model)
            const value = await Model.create(item);
            console.log(value);
            res.status(201).json(JSON.stringify(value));
        } catch (e) {
            console.log('Erreur: ' + e.message);
            res.status(500).send('Impossible d\'effectuer cette opération : ' + e.message);
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const item = req.body;
            const value = await Model.update(item, {
                where: { id }
            });
            res.status(201).json(value);
        } catch (e) {
            res.status(500).send('Impossible d\'effectuer la modification : ' + e.message);
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const value = await Model.update({
                enabled: false
            }, {
                where: { id }
            });
            res.status(201).json(value);
        } catch (e) {
            res.status(500).send('Impossible d\'effectuer la suppression : ' + e.message);
        }
    });

    return router;
}

module.exports = ctrl;