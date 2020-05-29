const ks = require('./knex_shelf');

const Recept = ks.Model.extend({
    tableName: 'Recept',
    idAttribute: 'id',
    uporabnik: function() {
        return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
    },
    hrana: function() {
        return this.hasMany(require('./hrana'), 'Recept_id');
    },
    kategorija_recepta: function() {
        return this.hasMany(require('./Kategorija_recepta'), 'Recept_id');
    }
});

module.exports = Recept;