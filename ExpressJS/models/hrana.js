const ks = require('./knex_shelf');

const Hrana = ks.Model.extend({
    tableName: 'Hrana',
    idAttribute: 'id',
    Recept: function() {
        return this.belongsTo(require('./Recept'), 'Recept_id');
    }
});

module.exports = Hrana