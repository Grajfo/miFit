const Vaja = require('../models/vaja');

exports.vseVaje = async(req, res) => {
    try {  
        const vaje = await new Vaja().fetchAll({ withRelated: ['misicnaMasa'] });
         res.json(vaje.toJSON());
      } catch (error) {
           res.status(500).json(error);
          }}


exports.enaVaja = async(req, res) => 
{
   try 
   {    
        const vaja = await new Vaja().where('id', req.params.id).fetch();
        return res.json(vaja.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};

exports.dodajVajo = async(req, res) => {
    try {  
        const { naziv, opis, st_ponovitev,st_serij,poraba_kalorij,video_vaje,misicnaSkupina_id} = req.body;
        const nov = await new Vaja().save({ naziv, opis, st_ponovitev,st_serij,poraba_kalorij,video_vaje,misicnaSkupina_id });
        res.json('Dodano');
     } 
 catch (error)
     {
      res.status(500).json(error);
     } 
     }

exports.izbrisiVajo = async(req, res) => {
    try
    {
        VajaZbris = await new Vaja().where('id', req.params.id).destroy();
        return res.json({message: 'Zbrisano'});
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
}

exports.posodobiVajo = async(req, res) => {
    try {
        if(req.params.id == req.body.id)
        {
            vaja = await new Vaja().where('id',req.body.id).fetch({require:true});
            vaja.save({
                naziv:req.body.naziv,
                opis:req.body.opis,
                 st_ponovitev:req.body.st_ponovitev,
                 st_serij:req.body.st_serij,
                 poraba_kalorij:req.body.poraba_kalorij,
                 video_vaje:req.body.video_vaje,
                 misicnaSkupina_id:req.body.misicnaSkupina_id
            },{patch:true})    
                //const { naziv, opis, st_ponovitev,st_serij,poraba_kalorij,video_vaje,misicnaSkupina_id} = req.body;
                //const nov = await new Vaja().save({ naziv, opis, st_ponovitev,st_serij,poraba_kalorij,video_vaje,misicnaSkupina_id });        
               return res.json('Uspesno spremenjena vaja');     
        }
        else
        {
            return res.status(400).json({msg: 'ID ne obstaja'});
        }        
    } catch (error) {
        res.status(500).json(error);
    }}