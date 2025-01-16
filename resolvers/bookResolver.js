const Book =  require('../models/book');
const Author = require('../models/author');
const author = require('../models/author');


const resolvers = {
    Query: {
        books : async () => await Book.find(),
        book : async(parent, args) => await Book.findById(args.id),
        authors: async () =>  await Author.find(),
        author: async(parent, args) => await Author.findById(args.id),
    },
    utation: {
        addBook: async (parent, args) => {
            const book = new Book(args);
            return await book.save();
        },
        updateBook: async (parent, args) => {
            return await Book.findByIdAndUpdate(args.id, args, { new: true });
        },
        deleteBook: async (parent, args) => {
            return await Book.findByIdAndRemove(args.id);
        },
    },
    Book: {
        author: async (parent) => await Author.findById(parent.authorId),
    },
    Author: {
        books: async (parent) => await Book.find({ authorId: parent.id }),
    },
};

module.exports = resolvers;