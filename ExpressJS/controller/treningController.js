const Trening = require('../models/trening');


exports.vsiTreningi = async(req, res) => {
    try {  
        const trening = await new Trening().fetchAll({ withRelated: ['vaja'] });
        res.json(trening.toJSON());
        } catch (error) {
        res.status(500).json(error);
        } }

exports.vsiTreningiWhere = async(req, res) => {
            try {  
                const trening = await new Trening().where('uporabnik_id',req.params.id).fetchAll({require:true});
                res.json(trening.toJSON());
                } catch (error) {
                res.status(500).json(error);
                } }
exports.enTrening = async(req, res) => 
{
   try 
   {    
        const vaja = await new Trening().where('id', req.params.id).fetch();
        return res.json(vaja.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};

exports.dodajTrening = async(req, res) => {
    try {  
        const novtrening = 
        {
            naziv: req.body.naziv,       
            tip: req.body.tip,       
            opis: req.body.opis,  
            datum_treninga: req.body.datum_treninga.split('T')[0],
            vaja_id: req.body.vaja_id,
            uporabnik_id: req.body.uporabnik_id
        };


        const { naziv, tip, opis,datum_treninga,vaja_id} = req.body;
        const nov = await new Trening().save(novtrening);
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
        if(true)
        {           
            trening = await new Trening().where('id',req.params.id).fetch({require:true});
            trening.save({
                naziv:req.body.naziv,
                tip:req.body.tip,
                opis:req.body.opis,
                datum_treninga:req.body.datum_treninga.split('T')[0],
                uporabnik_id:req.body.uporabnik_id,
                vaja_id:req.body.vaja_id
                 
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