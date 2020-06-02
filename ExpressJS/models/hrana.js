const ks = require('./knex_shelf');

const Hrana = ks.Model.extend({
    tableName: 'Hrana',
    idAttribute: 'id',
    uporabnik: function() {
        return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
    }
});

module.exports = Hrana