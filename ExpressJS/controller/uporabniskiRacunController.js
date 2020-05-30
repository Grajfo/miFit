const uporabniskiRacun = require('../models/uporabniskiRacun');
const bcrypt = require('bcrypt');

exports.vsiUporabniskiRacuni = async(req, res) => 
{
    try
    {
        const vsiUporabniskiRacuni = await new uporabniskiRacun().fetchAll();
        return res.json(vsiUporabniskiRacuni.toJSON());
    } 
    catch (err)
    {
        return res.status(500).json(err);
    }
};

exports.enUporabniskiRacun =  async(req, res) => 
{
    try 
   {
        const enUporabniskiRacun = await new uporabniskiRacun().where('id', req.params.iduporabniskiRacun).fetch();
        return res.json(enUporabniskiRacun.toJSON());
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'ID ('+req.params.iduporabniskiRacun+') ne obstaja'});        
   }
};

exports.aliobstaja =  async(req, res) => 
{
    try 
   {
        const vsiUporabniskiRacuni = await new uporabniskiRacun().fetchAll();
        const uporabnikivsi = vsiUporabniskiRacuni.toJSON()
        const uporabnikObstaja = uporabnikivsi.filter(u => u.email === req.body.email);

        //console.log(uporabnikObstaja[0].geslo)
        const geslo = bcrypt.compareSync(req.body.geslo, uporabnikObstaja[0].geslo)
        return res.json(geslo);
   } 
   catch (err) 
   {
        return res.status(404).json({msg: 'ne obstaja'});        
   }
};

exports.addUporabniskiRacun = async(req, res) => 
{
    try
    {
        const vsiUporabniskiRacuni = await new uporabniskiRacun().fetchAll();
        const poisciEmail = vsiUporabniskiRacuni.toJSON().some(e => e.email === req.body.email);
        console.log(poisciEmail)
        if (poisciEmail === true){
            return res.status(400).json({ msg: 'EMAIL ZE OBSTAJA!' });
        }
        else if (poisciEmail === false){
            const newuporabniskiRacun = 
            {
                email: req.body.email,       
                geslo: bcrypt.hashSync(req.body.geslo, 10)     
            };

            if (!newuporabniskiRacun.email|| !newuporabniskiRacun.geslo)
            {
                return res.status(400).json({ msg: 'Nekatera polja so prazna!' });
            }
            else
            {
                const shrani = await new uporabniskiRacun().save(newuporabniskiRacun);
                return res.json({message: 'Nov Uporabniski Racun je vnesen!'}); 
            } 
        }
    }
    catch(err)
    {
        return res.status(400).json(err); 
    } 
};



exports.updateUporabniskiRacun = async(req, res) => 
{    
    try
    {
        if(req.params.iduporabniskiRacun == req.body.id)
        {
            if(typeof req.body.email === 'string' && req.body.email !== "" && typeof req.body.geslo === 'string' && req.body.geslo !== "")
            {
                up = await new uporabniskiRacun().where('id', req.body.id).save(
                    {
                        email: req.body.email,       
                        geslo: req.body.geslo
                    },
                    {patch:true}
                );
                return res.json({message: 'Uporabniski Racun je posodobljen'});          
            }
            else
            {
                return res.status(404).json({msg: 'Podatki niso pravilni'});
            }
        }
        else
        {
            return res.status(400).json({msg: 'ID ('+req.params.iduporabniskiRacun+') ne obstaja'});
        }
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
};

exports.deleteUporabniskiRacun = async(req, res) => 
{
    try
    {
        delUporabniskiRacun = await new uporabniskiRacun().where('id', req.params.iduporabniskiRacun).destroy();
        return res.json({message: '"Uporabniski Racun je izbrisan'});          
    }
    catch (err)
    {
        return res.status(404).json({msg: 'ID ('+req.params.iduporabniskiRacun+') ne obstaja'});
    }     
};
