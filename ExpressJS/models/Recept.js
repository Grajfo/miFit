const ks = require('./knex_shelf');

const Recept = ks.Model.extend({
    tableName: 'Recept',
    idAttribute: 'id',
    uporabnik: function() {
        return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
    },
    hrana: function() {
        return this.belongsTo(require('./hrana'), 'hrana_id');
    },
    kategorija_recepta: function() {
        return this.belongsTo(require('./Kategorija_recepta'), 'kategorija_id');
    }
});

module.exports = Recept;