import db from "../database/database.connection.js";


export async function postPassengerDB(firstName, lastName) {
    const query = `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2);`;

    const newPassenger = await db.query(query, [firstName, lastName]);
    return newPassenger.rows;
};


