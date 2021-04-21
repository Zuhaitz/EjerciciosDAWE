var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


/**MongoDB**/
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId;

var db = mongojs('clientesapp', ['users'])

//var app = express();

// Middleware
router.use(express.static(path.join(__dirname,'public')));

// View Engine
/*app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));*/

// Middleware para el parseo de req.body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// Declaración y definición de variables globales
router.use(function(req, res, next){

    res.locals.errors = null;
    next();

});


// express validator middleware
router.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            forParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg: msg,
            value: value
        };
    }
}));
/***********************************************/

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://dawe2020-e7c45.firebaseio.com"
});

// Use the session middleware
router.use(session({
  secret: 'clavesecretaparaexpresss',
  saveUninitialized: true, // create session even if there is nothing stored
  resave: true, // save session even if unmodified
  cookie: { maxAge: 60 * 60 * 1000 },
  store: new MongoStore({ url: 'mongodb://127.0.0.1:27017/test-app'})
}));

router.get('/',(req,res) => {
  if(req.session.email) {
    return res.redirect('/users');
  }
  res.render('index', { title : 'title'});
});

router.post('/login',(req,res) => {
  req.session.email = req.body.email;
  res.end('done');
});

/*router.get('/admin',(req,res) => {
    if(req.session.email) {
        res.write(`<h1>Hello ${req.session.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});*/

/**Semana 9**/
router.get('/users',(req,res) => {
  if(req.session.email) {
      db.users.find(function (err, docs) {
          if (err) {
              console.log(err);
          } else {
              console.log(docs);
              if (!req.query.id) {
                  res.render('form', {
                      id: null,
                      greet: req.session.email,
                      title: 'Customers',
                      users: docs,
                      errors: null
                  });
              } else {
                  res.render('form', {
                      id: req.query.id,
                      greet: req.session.email,
                      first_name: req.query.first_name,
                      last_name: req.query.last_name,
                      email: req.query.email,
                      title: 'Customers',
                      users: docs,
                      errors: null
                  });
              }
          }
      });
  }
  else {
      res.write('<head><meta charset=utf-8 /></head>');
    res.write('<body><h1>Por favor, inicie sesión primero</h1></body>');
    res.end('<a href='+'/'+'>Login</a>');
  }
});

router.post("/users/add", function(req, res) {

    req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
    req.checkBody("last_name", "El apellido es obligatorio").notEmpty();

    req.checkBody("email", "El email es obligatorio").notEmpty();


    var errors = req.validationErrors();

    if (errors) {

        res.render('index', {
            title:'Customers',
            errors: errors
        });
    }else{

        var newUser = {
            "first_name" : req.body.first_name,
            "last_name" : req.body.last_name,
            "email" : req.body.email
        };

        db.users.insert( newUser, function( err, resp ) {
            if (err) {
                console.log(err);
            } else {
                db.users.insert( newUser );
            }

        });

    }

    res.redirect('/users');
});


router.delete('/users/delete/:id', function(req, res){
    // console.log(req.params.id);
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if (err){
            console.log(err);
        }

        res.redirect(303, '/users');
    });
});

router.post('/users/edit/:id', function(req, res){
    req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
    req.checkBody("last_name", "El apellido es obligatorio").notEmpty();
    req.checkBody("email", "El email es obligatorio").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title:'Customers',
            errors: errors
        });
    }else{
        var query = {_id: ObjectId(req.params.id)};
        var nuevos = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email };
        db.users.update(query, nuevos, function(err, respuesta) {
            if (err){
                console.log(err);
            }else{
                res.redirect('/users');
            }
        });
    }
});

/*************************************************************************/

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/?logout');
  });

});

/* GET home page. */
router.get('/:idToken', function (req, res) {

    const idToken = req.params.idToken;

    // idToken comes from the client app
    admin.auth().verifyIdToken(idToken)
         .then(function (decodedToken) {
             let uid = decodedToken.uid;

             admin.auth().getUser(uid)
                 .then(function(userRecord) {
                     // See the UserRecord reference doc for the contents of userRecord.
                     console.log( "Email verified:" + userRecord.emailVerified);
                     console.log('Successfully fetched user data:', userRecord.toJSON());
                     req.session.email = userRecord.email;
                     /*res.render('form', {title: userRecord.email});*/
                     res.redirect("/users");
                 })
                 .catch(function(error) {
                     console.log('Error fetching user data:', error);
                     res.render('error', {error: error, message: "Error fetching user data"});
                 });

         }).catch(function (error) {
         // Handle error
            res.render('error', {error: error, message: "You must be signed-up"});
         });

});

router.post('/getToken', (req, res) => {
  const idToken = req.body.idToken; // capturar parámetro

  // idToken comes from the client app
  // verificamos el idToken para ver si es válido
  admin.auth().verifyIdToken(idToken)
      .then(function (decodedToken) {
        // si es válido, lo decodificamos
        let uid = decodedToken.uid;

        // y obtenemos los datos asociados a ese usuario
        admin.auth().getUser(uid)
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully fetched user data:', userRecord.toJSON());
              req.session.email = userRecord.email;
              req.session.emailVerified = userRecord.emailVerified;
              res.send('{"status": "done"}');
            })
            .catch(function(error) {
              console.log('Error fetching user data:', error);
              res.send('{"status": "error"}');
            });

      }).catch(function (error) {
          // Handle error
        res.render('error', {error: error, message: "You must be signed-up"});
  });


});

// Use the session middleware
/*router.use(session({ secret: 'clavesecretaparaexpress', cookie: { maxAge: 60000 }}));

// Access the session as req.session
router.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('welcome to the session demo. refresh!')
  }
});*/

module.exports = router;
