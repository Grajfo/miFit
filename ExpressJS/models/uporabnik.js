const ks = require('./knex_shelf');


const Uporabnik = ks.Model.extend({
    tableName: 'Uporabnik',
    idAttribute: 'id',
    recepti: function() {
        return this.hasMany(require('./Recept'), 'uporabnik_id');
    },
    rezultati: function () {
        return this.hasMany(require('./rezultati'), 'uporabnik_id');
    },
    trening: function () {
        return this.hasMany(require('./trening'), 'uporabnik_id');
    }
});


module.exports = Uporabnik;