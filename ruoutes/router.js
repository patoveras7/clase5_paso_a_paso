const express = require('express');
const router = express.Router();
const libro = require('../models/modelos');//importamos el MODELO con el que mongoose va a mapear
//a la base de datos de MONGODB


router.get('/', async (req, res) => { 
    try {
        const libros = await libro.find();//en la constante se guardan todos los modelos encontrados en 
        //la coleccion definida en el modelo.
        if(libros!=0){//podemos vincular el array directamente con una cantidad.-
        res.json(libros);
        } else {
            throw error;
        }
        } catch (error) {
        res.status(500).json({ error: "Error al obtener la lista de libros, no existen ejemplares para mostrar." });
        }
});

router.post('/', async (req, res) => {
    try {
    const nuevoLibro = new libro(req.body);//nuevo modelo supeditado al parametro body
    if(!nuevoLibro.titulo || !nuevoLibro.genero || !nuevoLibro.paginas){
        throw error;
    }else{
    await nuevoLibro.save();    
    res.json(nuevoLibro);}
    } catch (error) {
    res.status(500).json({ error: "Error al crear el registro del libro, no ingreso los parametros requeridos." });
    }
    });
router.put('/:id', async (req, res) => {
        try {
            const modificarLibro = await libro.findByIdAndUpdate(req.params.id, req.body,{new: true});
            if(!req.body.titulo || !req.body.genero || !req.body.paginas){
                throw error;
            } else {
            res.json(modificarLibro);
            }
            } catch (error) {
            res.status(500).json({ error: "Error al actualizar el registro del libro. Quizas el ID no es el correcto o no ingreso los parametros de body requeridos." });
            }
            });


router.delete('/:id', async (req, res) => {
                try {
                await libro.findByIdAndDelete(req.params.id);
                res.json({ message: 'Registro de libro eliminado correctamente' });       
                } catch (error) {
                res.status(500).json({ error: 'Error al eliminar el registro de libro. El id es incorrecto.' });
                }
                });



module.exports = router;