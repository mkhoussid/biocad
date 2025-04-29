import { FastifyInstance } from 'fastify';
import { Client } from 'pg';

let client: Client;

export const connectDB = async (app: FastifyInstance) => {
	client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	try {
		await client.connect();
		app.decorate('pg', client);
		console.log('Connected to PostgreSQL');

		client.query(
			`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
        `,
		);
	} catch (err) {
		console.error('Failed to connect to PostgreSQL', err);
		process.exit(1);
	}
};

declare module 'fastify' {
	interface FastifyInstance {
		pg: Client;
	}
}
