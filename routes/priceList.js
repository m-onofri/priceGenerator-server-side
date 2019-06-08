const express = require('express');
const router = express.Router();
const PriceList = require('../models/PriceList');

router.get('/', function(req, res, next) {
    PriceList
        .find()
        .then(data => {
            const listino = data.reduce((obj, item) => {
                if (obj[item.name]) {
                    obj[item.name][item.period] = item;
                } else {
                    obj[item.name] = {};
                    obj[item.name][item.period] = item;
                }
                return obj;
            }, {});
            res.send(listino);
        })
        .catch(err => console.log(err));
});

router.post('/addNewPeriod', function(req, res, next) {
    const period = new PriceList({
        name: req.body.name.toUpperCase(),
        period: req.body.period,
        start: new Date(req.body.start.split("-")),
        end: new Date(req.body.end.split("-")),
        prices: {
            ad: parseFloat(req.body.ad),
            ad34: parseFloat(req.body.ad34),
            chd3: parseFloat(req.body.chd3),
            chd4: parseFloat(req.body.chd4),
            inf: parseFloat(req.body.inf),
            culla: parseFloat(req.body.culla),
            animal: parseFloat(req.body.animal),
            sing: parseFloat(req.body.sing)
        }
    });
    period.save()    
    .then(result => {
        console.log("New period created!");
        res.redirect("http://localhost:3000/admin");
    })
    .catch(err => console.log(err));
});


router.post('/createPriceList', function(req, res, next) {
    const periods = JSON.parse(req.body.priceList)
        .map(p => {
            return ({
                name: p[1].name.toUpperCase(),
                period: p[1].period,
                start: new Date(p[1].start.split("-")),
                end: new Date(p[1].end.split("-")),
                prices: {
                    ad: parseFloat(p[1].ad),
                    ad34: parseFloat(p[1].ad34),
                    chd3: parseFloat(p[1].chd3),
                    chd4: parseFloat(p[1].chd4),
                    inf: parseFloat(p[1].inf),
                    culla: parseFloat(p[1].culla),
                    animal: parseFloat(p[1].animal),
                    sing: parseFloat(p[1].sing)
                }
            });
        });
    
    const periodsNames = periods.map(p => p.period);
    const periodsNamesSet = new Set(periodsNames);
    if (periodsNames.length !== periodsNamesSet.size) {
        return res.send({
            success: false,
            message: 'Error: periods names must be unique.'
        });
    }
    for (let period of periods) {
        if (period.start.getTime() >= period.end.getTime()) {
            return res.send({
                success: false,
                message: 'Error: arrival date must be previous than departure date.'
            });
        }
    }

    if (periods.length > 1) {
        const newPeriods = [...periods];
        newPeriods.sort((a, b) => a.start.getTime() - b.start.getTime());
        for (let i = 0; i < (newPeriods.length - 1); i++) {
            if (newPeriods[i].end.getTime() > newPeriods[i + 1].start.getTime()) {
                return res.send({
                    success: false,
                    message: 'Error: date ranges cannot overlap.'
                });
            }
        }
    }

    PriceList
    .insertMany(periods)
    .then(result => {
        console.log("Price list saved!");
        return res.send({
            success: true,
            message: 'Price list saved!'
          });
    })
    .catch(err => console.log(err));
});

router.post('/manage', function(req, res, next) {
    if (req.body.update) {
        const prices = {
            ad: parseFloat(req.body.ad),
            ad34: parseFloat(req.body.ad34),
            chd3: parseFloat(req.body.chd3),
            chd4: parseFloat(req.body.chd4),
            inf: parseFloat(req.body.inf),
            culla: parseFloat(req.body.culla),
            animal: parseFloat(req.body.animal),
            sing: parseFloat(req.body.sing)
        }
        const start = new Date(req.body.start.split("-"));
        const end = new Date(req.body.end.split("-"));
        PriceList.update({_id: req.body.id},{$set:{
                                                name: req.body.name.toUpperCase(),
                                                period: req.body.period,
                                                start: start,
                                                end: end,
                                                prices: prices}
                                            },{multi:true,new:true})
        .then(docs => {
            console.log("Price List updated");
            res.redirect("http://localhost:3000/admin");
        }).catch((err)=>reject(err));
    } else if (req.body.delete) {
        PriceList.findOneAndRemove({_id: req.body.id})
            .then(docs => {
                console.log("Price List Deleted");
                res.redirect("http://localhost:3000/admin");
            }).catch(err => reject(err));
    }
});
 
module.exports = router;