var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId;


var db = mongojs('clientesapp', ['users'])


var app = express();

// Middleware
app.use(express.static(path.join(__dirname,'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para el parseo de req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Declaración y definición de variables globales
app.use(function(req, res, next){

       res.locals.errors = null;
        next();

});


// express validator middleware
app.use(expressValidator({
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



// enrutamiento
app.get("/", function(req, res) {
    // res.send("Hello World!");

    db.users.find( function(err, docs) {

        if (err) {
            console.log(err);
        } else {
            console.log(docs);
                if(!req.query.id){
                        res.render('index', {
                                id : null,
                                title: 'Customers',
                                users: docs,
                        });
                }else{
                        res.render('index', {
                                id: req.query.id,
                                first_name: req.query.first_name,
                                last_name: req.query.last_name,
                                email: req.query.email,
                                title:'Customers',
                                users: docs,
                        });
                }
        }

    });
});

app.post("/users/add", function(req, res) {

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

            res.redirect('/');
});


app.delete('/users/delete/:id', function(req, res){
	// console.log(req.params.id);
	db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
		if (err){
				console.log(err);
		}

		res.redirect(303, '/');
	});
});

app.post('/users/edit/:id', function(req, res){
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
                                res.redirect('/');
                        }
                });
        }
});


app.listen(3001, function(){
    console.log("Servidor lanzado en el puerto 3000");
});
