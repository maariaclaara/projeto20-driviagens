import db from "../database/database.connection.js";


export async function createTravelDB(passengerId, flightId) {

    const query = `INSERT INTO travels ("passengerId", "flightId") VALUES ($1,$2);`;

    await db.query(query, [passengerId, flightId]);
    return null;
};


export async function findTravelsDB(name, offset, postsPerPage, limit) {

    let query = `
            SELECT passengers."firstName", passengers."lastName", COUNT(travels.id) as travels
            FROM passengers
            LEFT JOIN travels
            ON passengers.id = travels."passengerId"
        `;

    let listTravels = [];

    if (name) {
        query += '  WHERE passengers."firstName" ILIKE $' + (listTravels.length + 1) + `OR passengers."lastName" ILIKE $` + (listTravels.length + 1);
        listTravels.push(`%${name}%`);
    }

    query += ' GROUP BY passengers.id ORDER BY travels DESC';
    if(limit >= 10 )
    {
        query += ' LIMIT $' + (listTravels.length + 1);
        listTravels.push(postsPerPage);
    }
    

    if (offset) {
        query += ' OFFSET $' + (listTravels.length + 1);
        listTravels.push(offset);
    }

    const travels = await db.query(query, listTravels);
    const fixedTravels = travels.rows.map(travel => {return {passenger: travel.firstName + " " + travel.lastName, travels:travel.travels}});
    return fixedTravels;
};


export async function validTravelDB(passengerId, flightId) {

    const query =  `SELECT CASE WHEN EXISTS (
                        SELECT * FROM passengers WHERE id = $1) 
                    AND EXISTS (
                        SELECT * FROM flights WHERE id = $2)
                    THEN 'true'
                    ELSE 'false'
                    END;
                `;

    const valid = await db.query(query, [passengerId, flightId]);
    
    return valid.rows[0].case === "false" 
    ? false 
    : true;
};