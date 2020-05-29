const ks = require('./knex_shelf');

const Vaja = ks.Model.extend({
    tableName: 'Vaja',
    idAttribute: 'id',
    misicnaMasa: function () {
    return this.belongsTo(require('./misicnaSkupina'),'misicnaSkupina_id');
    },
    trening: function () {
        return this.hasMany(require('./trening'),'trening_id');
        },
   });
   

module.exports = Vaja;