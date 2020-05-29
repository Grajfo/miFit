const ks = require('./knex_shelf');

const Kategorija_recepta = ks.Model.extend({
    tableName: 'Kategorija_recepta',
    idAttribute: 'id',
    Recept: function() {
        return this.belongsTo(require('./Recept'), 'Recept_id');
    }
});

module.exports = Kategorija_recepta