const db = require("../data/db-config.js");

module.exports = {
    find() {
        return db('schemes')
    },

    findById(id) {
        return db('schemes')
        .where({ id : id }).first();
    },

// findSteps(id):
// Expects a scheme id.
// Resolves to an array of all correctly ordered step for the given scheme: [ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ].
// This array should include the scheme_name not the scheme_id.
    findSteps(id){
        return db('schemes')
        .join('steps', 'steps.scheme_id', 'schemes.id')
        .select('steps.id','schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ "schemes.id" : id})
        .orderBy('steps.step_number')
    },

// add(scheme):
// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including id.
    add(scheme){
        return db('schemes').insert(scheme)
        .then((id) => {
            console.log(id)
            return db('schemes')
            .where({ id : id }).first();
        })
    },
// update(changes, id):
// Expects a changes object and an id.
// Updates the scheme with the given id.
// Resolves to the newly updated scheme object.
    update(changes, id) {
        return db('schemes')
        .where({ id: id })
        .update(changes)
        .then(res => {
            console.log(res)
            return db('schemes')
            .where({ id: id })
        })
    },

// remove(id):
// Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to null on an invalid id.
// (Hint: Only worry about removing the scheme. The database is configured to automatically remove all associated steps.)

    remove(id) {
        return db('schemes')
        .where({ id : id })
        .del()
    }
}

