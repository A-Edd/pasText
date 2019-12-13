const express   = require('express'),
        app     = express(),
    bodyParser  = require('body-parser'),
    routes      = require('./controller'),
    Paste       = require('./models'),
    shortid     = require('shortid'),
    mongoose    = require('mongoose');
    let port    = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use("views/public", express.static(__dirname +'/public'));
mongoose.connect('mongodb://localhost/pasText', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(routes);

app.use(checkIfEmptyMiddleware);

function checkIfEmptyMiddleware (){
    function ifEmpty(req, res, next){
        if(!req.body.raw || !req.body.title){
            res.send('ERR_Check_parameters')
        }else{
            next()            
        }
    }
}
// }


// app.get('*', (req,res)=>{
//     ifEmpty().then(()=>res.render('error'))
// })
app.listen(port, () => console.log(`\x1b[32m%s\x1b[0m`, `APP is running on PORT:${port}`));
        
