const ks = require('./knex_shelf');

const Hrana = ks.Model.extend({
    tableName: 'Hrana',
    idAttribute: 'id',
    Recept: function() {
        return this.hasMany(require('./Recept'), 'hrana_id');
    }
});

module.exports = Hrana