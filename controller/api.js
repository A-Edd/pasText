
const express   = require('express'),
Paste       = require('../models'),
shortid     = require('shortid'),
router      = express.Router();
//API Routes
router.get('/api', (req, res) => {
    Paste.find({})
        .then((paste) => {
            let api= [], baseUrl=req.protocol + '://' + req.get('host');
            paste.forEach(function(pasText){
            api.push({title: pasText.title, raw: pasText.raw, url:baseUrl+'/pastes/'+pasText._id});
            })
            res.json(api)
        })
        .catch((err) => res.render('error'));
});

router.post('/api/new', (req, res)=>{
    let data = {title: req.body.title, raw: req.body.raw, url: shortid.generate()};
    if(!data.raw || !data.title){
        res.send('ERR_Check_parameters')
    }else{
        Paste.create(data).then(res.redirect('/api')).catch((err)=> res.render('error'))
    }
})

router.use(checkIfEmptyMiddleware);

function checkIfEmptyMiddleware (){
    function ifEmpty(req, res, next){
        var pasText = {title: req.body.title, raw: req.body.raw}
        if(!pasText.raw || !pasText.title){
            res.send('ERR_Check_parameters')
        }else{
            next()
        }
    }
}
module.exports = router;