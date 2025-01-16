const { gql } = require('apollo-server-express');


const typeDefs = gql`
type Book {
id : ID!
title: String!
description : String
publicationStatus: String
author : Author
}

type Author{
id : ID!
name : String!
email : String
books : [Book]
}

type Query{
books : [Book]
book(id : ID!) : Book
authors : [Author]
author(id : ID!) : Author
}

 type Mutation {
    addBook(title: String!, description: String, publicationStatus: String, authorId: ID!): Book
    updateBook(id: ID!, title: String, description: String, publicationStatus: String): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;