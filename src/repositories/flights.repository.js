import db from "../database/database.connection.js";
import { formatBR } from "../services/date.service.js";


export async function createFlightDB(origin, destination, date) {
    const query = `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`;
    
    const flightsRows = await db.query(query, [origin, destination, date]);
    return flightsRows.rows;
};


export async function findFlightsDB(origin, destination, smaller_date, bigger_date) {
    let query = `SELECT flights.id, origin.name AS origin, destination.name AS destination, date
                    FROM flights
                    JOIN cities AS origin ON flights.origin = origin.id
                    JOIN cities AS destination ON flights.destination = destination.id`;

    const listFlights = []

    if (origin || destination || (smaller_date && bigger_date)) {
        query += ' WHERE '
    }

    if (origin) {
        query += 'origin = $1'
        listFlights.push(origin)
    }

    if (destination) {
        if (listFlights.length > 0) {
            query += ' AND '
        }
        query += 'destination = $' + (listFlights.length + 1)
        listFlights.push(destination);
    }

    if (smaller_date && bigger_date) {
        if (listFlights.length > 0) {
            query += ' AND '
        }
        query += 'date >= $' + (listFlights.length + 1) + ' AND date <= $' + (listFlights.length + 2)
        listFlights.push(smaller_date, bigger_date)
    }

    query += ' ORDER BY date ASC'

    const flights = await db.query(query, listFlights);
    const closeFlights = flights.rows.map((flight) => { return {...flight, date:formatBR(flight.date.toString())}})

    if (flights.rows.length === 0) return []

    return closeFlights;
};


export async function validFlightDB(from, to) {
    const query = `SELECT COUNT(*) FROM cities WHERE id IN ($1, $2);`;

    const cities = await db.query(query, [from, to]);
    return cities.rows[0].count > 1;
};