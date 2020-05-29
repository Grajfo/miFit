const ks = require('./knex_shelf');

const Trening = ks.Model.extend({
    tableName: 'Trening',
    idAttribute: 'id',
    vaja: function () {
    return this.belongsTo(require('./vaja'), 'vaja_id');
    },
    uporabnik: function () {
        return this.belongsTo(require('./uporabnik'), 'uporabnik_id');
        }
   });


module.exports = Trening;