// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const resolvers = require('./resolvers');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Apply authentication middleware
app.use(authMiddleware);

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => {
        return { user: req.user };
    },
});

server.start().then(() => {
    server.applyMiddleware({ app });
    
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
});
