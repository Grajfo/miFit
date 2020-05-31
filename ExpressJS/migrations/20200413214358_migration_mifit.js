
exports.up = function(knex) {
    return knex.schema.createTable('UporabniskiRacun', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('geslo').notNullable();
        table.boolean('vloga').notNullable();
        }
        ).createTable('Uporabnik', (table) => {
        table.increments('id').primary();
        table.string('ime').notNullable();
        table.string('priimek').nullable();
        table.enu('spol', ['M', 'Z']).notNullable();
        table.integer('starost').notNullable();
        table.decimal('teza').notNullable();
        table.decimal('visina').notNullable();
        table.decimal('ciljna_teza').notNullable();
        table.integer('uporabniskiRacun_id').references('id').inTable('UporabniskiRacun');
        }
        ).createTable('Recept', (table) => {
            table.increments('id').primary();
            table.string('ime').notNullable();
            table.string('opis').notNullable();
            table.string('hrana_opis').notNullable()
            table.decimal('kalorije').notNullable();
            table.string('hranilne_vrednosti').notNullable();
            table.integer('kategirja_id').references('id').inTable('Kategorija_recepta');
        }
        ).createTable('Hrana', (table) => {
            table.increments('id').primary();
            table.string('ime').notNullable();
            table.decimal('kalorije').notNullable();
            table.string('hranilne_vrednosti').notNullable();
            table.string('slika').nullable();
        }
        ).createTable('Kategorija_recepta', (table) => {
            table.increments('id').primary();
            table.string('ime_kategorije').notNullable();
            table.decimal('tip').notNullable();
        }
        ).createTable('Rezultati', (table) => {
            table.increments('id').primary();
            table.string('naziv').notNullable();
            table.string('uspesnost').notNullable();
            table.datetime('datum_rezultata').notNullable();
            table.integer('uporabnik_id').references('id').inTable('Uporabnik');
        }
        ).createTable('MisicnaSkupina', (table) => {
            table.increments('id').primary();
            table.string('ime').notNullable();
            table.string('tip').notNullable();
            table.string('slika').nullable();
        }
        )
        .createTable('Vaja', (table) => {
            table.increments('id').primary();
            table.string('naziv').notNullable();
            table.string('opis').notNullable();
            table.integer('st_ponovitev').notNullable();
            table.integer('st_serij').notNullable();
            table.decimal('poraba_kalorij').notNullable();
            table.string('video_vaje').nullable();
            table.integer('misicnaSkupina_id').references('id').inTable('MisicnaSkupina');
        }
        ).createTable('Trening', (table) => {
            table.increments('id').primary();;
            table.string('naziv').notNullable();
            table.string('tip').notNullable();
            table.string('opis').nullable();
            table.datetime('datum_treninga').notNullable();
            table.integer('uporabnik_id').references('id').inTable('Uporabnik');
            table.integer('vaja_id').references('id').inTable('Vaja');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('Kategorija_recepta')
        .dropTable('Hrana')
        .dropTable('Recept')
        .dropTable('Trening')
        .dropTable('UporabniskiRacun')
        .dropTable('MisicnaSkupina')
        .dropTable('Vaja')
        .dropTable('Uporabnik')
        .dropTable('Rezultati')
};