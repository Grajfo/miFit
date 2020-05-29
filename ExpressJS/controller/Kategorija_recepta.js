const Kategorija_recepta = require('../models/Kategorija_recepta');


exports.vsa_kategorija_recepta = async(req, res) => 
{
    try
    {
        const vseKategorije = await new Kategorija_recepta().fetchAll();
        return res.json(vseKategorije.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.ena_kategorija_recepta = async(req, res) => 
{
   try 
   {    
        const kategorija = await new Kategorija_recepta().where('id', req.params.idKatergorija_recepta).fetch();
        return res.json(kategorija.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'id ne obstaja'});
   }
};

exports.dodaj_Kategorija_recepta  = async(req, res) => 
{
    try
    {
        const novaKategorija = 
        {
            ime_kategorije: req.body.ime_kategorije,
            tip: req.body.tip
        };

        if (!novaKategorija.ime || !novaKategorija.kalorije)
        {
            return res.status(400).json({ msg: 'podatki ne smejo biti prazni' });
        }
        else
        {
            const shrani = await new Kategorija_recepta().save(novaKategorija);
            return res.json({message: 'Kategorija dodana'}); 
        }
    }
    catch(err)
    {
        return res.status(404).json(err);    
    }
};

exports.posodobi_Kategorija_recepta = async(req, res) => 
{
    try
    {
        if(req.params.idKatergorija_recepta == req.body.id)
        {
            if(typeof req.body.ime_kategorije === 'string' && typeof req.body.tip === 'string' && req.body.ime_kategorije !== "" && req.body.tip !== "")                 
            {
                kategorija = await new Kategorija_recepta().where('id', req.body.id).save
                (
                    {
                        ime_kategorije: req.body.ime_kategorije,
                        tip: req.body.tip
                    }, {patch:true}
                );
                return res.json({message: 'kategorija posodobljena'});          

            }
            else
            {
                return res.status(404).json({msg: 'podatki niso pravilni'});
            }
        }
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
};

exports.izbrisi_kategorija_recepta = async(req, res) => 
{
    try
    {
        delKategorija = await new Kategorija_recepta().where('id', req.params.idKatergorija_recepta).destroy();   
        return res.json({message: 'kategorija izbrisana'});          
    
    }
    catch (err)
    {
        return res.status(404).json({msg: 'id ne obstaja'});
    }
};