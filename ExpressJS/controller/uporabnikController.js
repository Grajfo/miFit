const Uporabnik = require('../models/uporabnik');
const spolEnum = Object.freeze({1:"M", 2:"Z"});

exports.vsiUporabniki = async(req, res) => 
{
    try
    {
        const vsiUporabniki = await new Uporabnik().fetchAll({ withRelated: ['recepti', 'rezultati', 'trening'] });
        return res.json(vsiUporabniki.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.enUporabnik = async(req, res) => 
{
   try 
   {
        const uporabnik = await new Uporabnik().where('id', req.params.idUporabnik).fetch({ withRelated: ['recepti', 'rezultati', 'trening'] });
        return res.json(uporabnik.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});    
   }
};

exports.dodajUporabnika = async(req, res) => 
{
    try
    {
        const novuporabnik = 
        {
            ime: req.body.ime,
            priimek: req.body.priimek,
            spol: req.body.spol,
            starost: req.body.starost,
            teza: req.body.teza,
            visina: req.body.visina,
            ciljna_teza: req.body.ciljna_teza
        };

        if (!novuporabnik.ime || !Object.values(spolEnum).includes(novuporabnik.spol) || !novuporabnik.starost || !novuporabnik.teza || !novuporabnik.visina || !novuporabnik.ciljna_teza)
        {
            return res.status(400).json({ msg: 'podatki ne smejo biti prazni' });
        }
        else
        {
            const shrani = await new Uporabnik().save(novuporabnik);
            return res.json({message: 'uporabnik dodan'}); 
        }
    }
    catch(err)
    {
        return res.status(400).json(err); 
    }
};

exports.posodobiUporabnika = async(req, res) => 
{
    try
    {
        if(typeof req.body.ime === 'string' && req.body.ime !== "" && Object.values(spolEnum).includes(req.body.spol) && typeof req.body.starost === 'number' && typeof req.body.teza === 'number' && typeof req.body.visina === 'number' && typeof req.body.ciljna_teza === 'number')
        {
            up = await new Uporabnik().where('id', req.params.idUporabnik).save(
                {
                    ime:req.body.ime,
                    priimek:req.body.priimek,
                    spol:req.body.spol,
                    starost:req.body.starost,
                    teza:req.body.teza,
                    visina:req.body.visina,
                    ciljna_teza: req.body.ciljna_teza
                },
                {patch:true}
            );
            return res.json({message: 'uporabnik posodobljena'});          
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

exports.izbrisiUporabnika = async(req, res) => 
{
    try
    {
        deluporabnik = await new Uporabnik().where('id', req.params.idUporabnik).destroy();
        return res.json({message: 'uporabnik izbrisana'});          
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
};