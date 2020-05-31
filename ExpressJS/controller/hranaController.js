const Hrana = require('../models/hrana');


exports.vsaHrana = async(req, res) => 
{
    try
    {
        const vsaHrana = await new Hrana().fetchAll();
        return res.json(vsaHrana.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.enaHrana = async(req, res) => 
{
   try 
   {    
        const hrana = await new Hrana().where('id', req.params.idHrana).fetch();
        return res.json(hrana.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};

exports.pregledHraneGledeNaKalorije = async(req, res) => 
{
   try 
   {    
        const hrana = await new Hrana().fetchAll();
        if(!req.body.stevilo1 || !req.body.stevilo2 || typeof req.params.st1 === 'number' || typeof req.params.st1 === 'number'){
            const hranaGledeNaKalorije = hrana.toJSON().filter(u => u.kalorije >= req.params.st1 && u.kalorije <= req.params.st2);      
            return res.json(hranaGledeNaKalorije);
        }
        else{
            return res.status(404).json({msg: 'podatki niso bili pravilni'})
        }
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};
exports.dodajHrano = async(req, res) => 
{
    try
    {
        const novahrana = 
        {
            ime: req.body.ime,
            kalorije: req.body.kalorije,
            hranilne_vrednosti: req.body.hranilne_vrednosti
        };

        if (!novahrana.ime || !novahrana.kalorije || !novahrana.hranilne_vrednosti)
        {
            return res.status(400).json({ msg: 'podatki ne smejo biti prazni' });
        }
        else
        {
            const shrani = await new Hrana().save(novahrana);
            return res.json({message: 'hrana dodana'}); 
        }
    }
    catch(err)
    {
        return res.status(404).json(err);    
    }
};

exports.posodobiHrano = async(req, res) => 
{
    try
    {
        if(typeof req.body.ime === 'string' && typeof req.body.kalorije === 'number' && typeof req.body.hranilne_vrednosti === 'string' && req.body.ime !== "" && req.body.hranilne_vrednosti !== "")                 
        {
            hrana = await new Hrana().where('id', req.params.idHrana).save
            (
                {
                    ime: req.body.ime,
                    kalorije: req.body.kalorije,
                    hranilne_vrednosti: req.body.hranilne_vrednosti
                }, {patch:true}
            );
            return res.json({message: 'hrana posodobljena'});          

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

exports.izbrisiHrano = async(req, res) => 
{
    try
    {
        delHrana = await new Hrana().where('id', req.params.idHrana).destroy();   
        return res.json({message: 'hrana izbrisana'});          
    
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
};