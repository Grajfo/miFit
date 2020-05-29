const Trening = require('../models/trening');


exports.vsiTreningi = async(req, res) => {
    try {  
        const trening = await new Trening().fetchAll({ withRelated: ['vaja'] });
        res.json(trening.toJSON());
        } catch (error) {
        res.status(500).json(error);
        } }

exports.dodajTrening = async(req, res) => {
    try {  
        const { naziv, tip, opis,datum_treninga,vaja_id} = req.body;
        const nov = await new Trening().save({  naziv, tip, opis,datum_treninga,vaja_id});
        res.json('Dodano');
     } 
 catch (error)
     {
      res.status(500).json(error);
     } 
     }

exports.izbrisiTrening = async(req, res) => {
    try
    {
        TreningZbris = await new Trening().where('id', req.params.id).destroy();
        return res.json({message: 'Zbrisano'});
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
}

exports.posodobiTrening = async(req, res) => {
    try {
        if(req.params.id == req.body.id)
        {           
            trening = await new Trening().where('id',req.body.id).fetch({require:true});
            trening.save({
                naziv:req.body.naziv,
                tip:req.body.tip,
                opis:req.body.opis,
                datum_treninga:req.body.datum_treninga,
             
                 
            },{patch:true})                     
               return res.json('Uspesno spremenjen trening');     
        }
        else
        {
            return res.status(400).json({msg: 'ID ne obstaja'});
        }        
    } catch (error) {
        res.status(500).json(error);
    }}