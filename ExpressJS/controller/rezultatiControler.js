const rezultat = require('../models/rezultati');

exports.vsiRezultati = async(req, res) => 
{
    try
    {
        const vsiRezultati = await new rezultat().fetchAll({ withRelated: ['uporabnik'] });
        return res.json(vsiRezultati.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.vsiRezultatiWhere = async(req, res) => 
{
    try
    {
        const vsiRecepti = await new rezultat().where('uporabnik_id',req.params.id).fetchAll({require:true});
        return res.json(vsiRecepti.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.enRezultat =  async(req, res) => 
{
    try 
   {
        const enRezultat = await new rezultat().where('id', req.params.idRezultati).fetch({ withRelated: ['uporabnik'] });
        return res.json(enRezultat.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'ID ('+req.params.idRezultati+') ne obstaja'});    
   }
};

exports.addRezultat = async(req, res) => 
{ 
    try
    {
        const newrezultat = 
        {
            naziv: req.body.naziv,       
            uspesnost: req.body.uspesnost,   
            datum_rezultata: req.body.datum_rezultata.split('T')[0],
            uporabnik_id: req.body.uporabnik_id
        };

        if (!newrezultat.naziv || !newrezultat.uspesnost || !newrezultat.datum_rezultata || !newrezultat.uporabnik_id)
        {
            return res.status(400).json({ msg: 'Nekatera polja so prazna!' });
        }
        else
        {
            const shrani = await new rezultat().save(newrezultat);
            return res.json({message: 'Nov rezultat vnesen!'}); 
        }
    }
    catch(err)
    {
        return res.status(400).json(err); 
    }
};



exports.updateRezultat = async(req, res) => 
{
    try
    {
        if(typeof req.body.naziv === 'string' && req.body.naziv !== "")
        {
            up = await new rezultat().where('id', req.params.idRezultati).save(
                {
                    naziv: req.body.naziv,       
                    uspesnost: req.body.uspesnost,   
                    datum_rezultata: req.body.datum_rezultata.split('T')[0],
                    uporabnik_id: req.body.uporabnik_id
                },
                {patch:true}
            );
            return res.json({message: 'Rezultat je posodobljen'});          
        }
        else
        {
            return res.status(404).json({msg: 'Podatki niso pravilni'});
        }

    }
    catch(err)
    {
        return res.status(400).json(err);
    }
};

exports.deleteRezultat = async(req, res) => 
{
    try
    {
        delRezultat = await new rezultat().where('id', req.params.idRezultati).destroy();
        return res.json({message: 'Rezultat je izbrisan'});          
    }
    catch (err)
    {
        return res.status(404).json({msg: 'ID ('+req.params.idRezultati+') ne obstaja'});
    } 
};
