const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../schema/schema');
const resolvers = require('../resolvers');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

describe('Books Resolvers', () => {
    let query, mutate;

    beforeAll(async () => {
        connectDB();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ /* add context if needed */ })
        });
        const testClient = createTestClient(server);
        query = testClient.query;
        mutate = testClient.mutate;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('fetches list of books', async () => {
        const GET_BOOKS = `
            query {
                books {
                    id
                    title
                }
            }
        `;
        const response = await query({ query: GET_BOOKS });
        console.log(response.errors);  // Log any errors that might have occurred
        expect(response.data.books).toEqual([]);
    });
    
    it('adds a new book', async () => {
        const ADD_BOOK = `
            mutation {
                addBook(title: "New Book", description: "Test Description", authorId: "123456789012") {
                    title
                    description
                }
            }
        `;
        const response = await mutate({ mutation: ADD_BOOK });
        console.log(response.errors);  // Log any errors that might have occurred
        expect(response.data.addBook.title).toEqual("New Book");
    });
});