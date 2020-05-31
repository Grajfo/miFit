const ks = require('./knex_shelf');

const Recept = ks.Model.extend({
    tableName: 'Recept',
    idAttribute: 'id',
    uporabnik: function() {
        return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
    },
    kategorija_recepta: function() {
        return this.belongsTo(require('./Kategorija_recepta'), 'kategirja_id');
    }
});

module.exports = Recept;