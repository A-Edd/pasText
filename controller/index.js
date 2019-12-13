//ROUT

const express   = require('express'),
    Paste       = require('../models'),
    api         = require('./api'),
    shortid     = require('shortid'),
    router      = express.Router();



router.get('/', (req, res) => res.redirect('/pastes/new'));

router.get('/pastes/new', (req, res)=> res.render('new'));

router.post('/pastes/new', (req, res)=> {
    // ifEmpty();
    let pasText= {title: req.body.title, raw: req.body.raw, url: shortid.generate()};
        if(!pasText.title || !pasText.raw){
            res.send("PARAMS EMPTY!")
        }else{
            Paste.create(pasText)
            .then(res.redirect('/api'))
            .catch((err)=> console.log(err))
        }

})

router.get('/pastes/:id', (req, res)=>{
    Paste.findById(req.params.id)
        .then((paste)=> res.render('paste', {pasText: paste}))
        .catch((err)=> res.render('error'));
})


//API Routes
router.get('/api', (req, res) => {
    Paste.find({})
        .then((paste) => {
            let api= [], baseUrl=req.protocol + '://' + req.get('host');
            paste.forEach(function(pasText){
            api.push({title: pasText.title, raw: pasText.raw, url:baseUrl+'/pastes/'+pasText.url});
            })
            res.json(api)
        })
        .catch((err) => res.render('error'));
});

// router.post('/api/new', (req, res)=>{
//     let data = {title: , raw: };
//     if(!req.body.title || !req.body.raw){
//         res.send('ERR_Check_parameters')
//     }else{
//         Paste.create(data).then(res.redirect('/api')).catch((err)=> res.render('error'))
//     }
// })


module.exports = router;