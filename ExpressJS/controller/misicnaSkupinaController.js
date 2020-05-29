const MisicnaSkupina = require('../models/misicnaSkupina');

exports.vseMisicna = async(req, res) => {
try {  
    const misicna = await new MisicnaSkupina().fetchAll();
 res.json(misicna.toJSON());
 } catch (error) {
 res.status(500).json(error);
 } }

exports.dodajMisicno = async(req, res) => {
    try {  
           const { ime,tip, slika} = req.body;
           const nov = await new MisicnaSkupina().save({ime,tip, slika});
           res.json('Dodano');
        } 
    catch (error)
        {
         res.status(500).json(error);
        } 
     }

exports.izbrisiMisicno = async(req, res) => {
    try
    {
        MisicnaZbris = await new MisicnaSkupina().where('id', req.params.id).destroy();
        return res.json({message: 'Zbrisano'});
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
}

exports.posodobiMisicno = async(req, res) => {
    try {
        if(req.params.id == req.body.id)
        {           
            misicna = await new MisicnaSkupina().where('id',req.body.id).fetch({require:true});
            misicna.save({
                ime:req.body.ime,
                tip:req.body.tip,
                slika:req.body.slika
            },{patch:true})                     
               return res.json('Uspesno spremenjena misicna skupina');     
        }
        else
        {
            return res.status(400).json({msg: 'ID ne obstaja'});
        }        
    } catch (error) {
        res.status(500).json(error);
    }}