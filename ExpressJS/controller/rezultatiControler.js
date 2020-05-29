const rezultat = require('../models/rezultati');
// test
// test
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
            datum_rezultata: req.body.datum_rezultata,
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
        if(req.params.idRezultati == req.body.id)
        {
            if(typeof req.body.naziv === 'string' && req.body.naziv !== "" && typeof req.body.uspesnost === 'string' && typeof req.body.datum_rezultata === 'string' && typeof req.body.uporabnik_id === 'number')
            {
                up = await new rezultat().where('id', req.body.id).save(
                    {
                        naziv: req.body.naziv,       
                        uspesnost: req.body.uspesnost,   
                        datum_rezultata: req.body.datum_rezultata,
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
        else
        {
            return res.status(400).json({msg: 'ID ('+req.params.idRezultati+') ne obstaja'});
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
