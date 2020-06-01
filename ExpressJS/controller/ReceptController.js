const Recept = require('../models/Recept');


exports.vsiRecepti = async(req, res) => 
{
    try
    {
        const vsiRecepti = await new Recept().fetchAll({ withRelated: ['kategorija_recepta'] });
        return res.json(vsiRecepti.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};



exports.vsiReceptiWhere = async(req, res) => 
{
    try
    {
        const vsiRecepti = await new Recept().where('uporabnik_id',req.params.id).fetchAll({require:true});
        return res.json(vsiRecepti.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};




exports.enRecept = async(req, res) => 
{
   try 
   {    
        const recept = await new Recept().where('id', req.params.idRecept).fetch({ withRelated: ['kategorija_recepta', 'uporabnik'] });
        return res.json(recept.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};

exports.poisciReceptePoTipu = async(req, res) => 
{
    try
    {
        const vsiRecepti = await new Recept().fetchAll({ withRelated: ['kategorija_recepta'] });
        const vsiRecepteGledeNaTip = vsiRecepti.toJSON().filter(u => u.kategorija_recepta.tip === req.params.tip);
        
        return res.json(vsiRecepteGledeNaTip);
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.poisciReceptePoKategoriji = async(req, res) => 
{
    try
    {
        const vsiRecepti = await new Recept().fetchAll({ withRelated: ['kategorija_recepta'] });
        const vsiRecepteGledeNaKategorijo = vsiRecepti.toJSON().filter(u => u.kategorija_recepta.ime_kategorije === req.params.kategorija);
        
        return res.json(vsiRecepteGledeNaKategorijo);
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.dodajRecept = async(req, res) => 
{
    try
    {
        const novrecept = 
        {
            ime: req.body.ime,
            opis: req.body.opis,
            hrana_opis: req.body.hrana_opis,
            kalorije: req.body.kalorije,
            hranilne_vrednosti: req.body.hranilne_vrednosti,
            uporabnik_id: req.body.uporabnik_id,
            kategirja_id: req.body.kategirja_id,
        };

        if (!novrecept.ime || !novrecept.opis || !novrecept.kalorije || !novrecept.hranilne_vrednosti || !novrecept.hrana_opis)
        {
            return res.status(400).json({ msg: 'podatki ne smejo biti prazni' });
        }
        else
        {
            const shrani = await new Recept().save(novrecept);
            return res.json({message: 'recept dodana'}); 
        }
    }
    catch(err)
    {
        return res.status(404).json(err);    
    }
};

exports.posodobiRecept = async(req, res) => 
{
    try
    {
        if(typeof req.body.ime === 'string' && typeof req.body.opis === 'string' && typeof req.body.hrana_opis === 'string' && typeof req.body.kalorije === 'number' && typeof req.body.hranilne_vrednosti === 'string' && req.body.ime !== "" && req.body.opis !== "" && req.body.hrana_opis !== "" && req.body.hranilne_vrednosti !== "")                 
        {
            recept = await new Recept().where('id', req.params.idRecept).save
            (
                {
                    ime: req.body.ime,
                    opis: req.body.opis,
                    hrana_opis: req.body.hrana_opis,
                    kalorije: req.body.kalorije,
                    hranilne_vrednosti: req.body.hranilne_vrednosti,
                    uporabnik_id: req.body.uporabnik_id,
                    kategirja_id: req.body.kategorija_id
                   
                }, {patch:true}
            );
            return res.json({message: 'recept posodobljena'});          

        }
        else
        {
            return res.status(404).json({msg: 'podatki niso pravilni'});
        }

    }
    catch(err)
    {
        return res.status(400).json(err);
    }
};

exports.izbrisiRecept = async(req, res) => 
{
    try
    {
        delRecept = await new Recept().where('id', req.params.idRecept).destroy();   
        return res.json({message: 'recept izbrisana'});          
    
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
};