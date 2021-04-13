var express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs')
const extValidas = ['.jpg', '.jpeg', '.png'];


function getFileSize(filename) {
    let stats = fs.statSync(filename);
    let {size} = stats;
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/imgs/');
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage: storage });

var pedido = upload.array('fileselect');

router.post('/add', pedido, (req, res) => {

    console.log(req.files);
    console.log(req.body.nombre);

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }else if (!req.files) {
        return res.send({ err: 'Elige una imagen a subir' });
    }else if (!req.body.nombre) {
        return res.send({ err: 'El campo \'Nombre\' es obligatorio' });
    }else if (!req.body.telefono) {
        return res.send({ err: 'El campo \'Telefono\' es obligatorio' });
    }else if (!req.body.email) {
        return res.send({ err: 'El campo \'E-mail\' es obligatorio' });
    }else if (!req.body.libro) {
        return res.send({ err: 'El campo \'Libro\' es obligatorio' });
    }else if (!req.body.cantidad) {
        return res.send({ err: 'El campo \'Cantidad\' es obligatorio' });
    }else{
        let result = [ {
            name : req.body.nombre,
            tel : req.body.telefono,
            email : req.body.email,
            libro : req.body.libro,
            cantidad : req.body.cantidad
        }];
        const files = req.files;
        let index, len;
        var correcto = true;


        for (index = 0, len = files.length; index < len && correcto; ++index) {
            var sizeInMB = (req.files[index].size / (1024*1024)).toFixed(2);
            var extension = path.extname(req.files[index].originalname);

            if (extValidas.includes(extension) && sizeInMB < 2)
                result.push( { file : req.files[index].path.replace("public","") });
            else {
                correcto = false;
            }
        }

        if (!correcto){
            for (index = 0, len = files.length; index < len; ++index) fs.unlinkSync(req.files[index].path);
            return res.send({ err: '¡ERROR: Un archivo pesa mas de 2MB, o no es un .png o .jpeg!' });
        } else res.send(result);
    }

});

module.exports = router;