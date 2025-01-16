const Book = require('../models/book');
const Author = require('../models/author');

const resolvers = {
    Query: {
        books: async (parent, args, context) => {
            if (!context.user) throw new Error(`Authentication required`);
            return await Book.find();
        },
        book: async (parent, args, context) => {
            if (!context.user) throw new Error(`Authentication required`);
            return await Book.findOne({ id: args.id });
        },
        authors: async (parent, args, context) => {
            if (!context.user) throw new Error(`Authentication required`);
            return await Author.find();
        },
        author: async (parent, args, context) => {
            if (!context.user) throw new Error(`Authentication required`);
            return await Author.findOne({ id: args.id });
        },
    },
    Mutation: {
        addBook: async (parent, args, context) => {
            if (!context.user) throw new Error('Authentication required');
            const book = new Book(args);
            return await book.save();
        },
        updateBook: async (parent, args, context) => {
            if (!context.user) throw new Error('Authentication required');
            try {
                const book =  await Book.findOne({ id : args.id});
                if(book){
                    Object.keys(args).forEach(key => {
                        book[key] = args[key];
                    });
                    return await book.save();
                }else{
                    throw new Error(`Book not found`);
                }
            } catch (error) {
                throw new Error(`Error updating the book`)
            }
        },
        deleteBook: async (parent, args, context) => {
            if(!context.user) throw new Error(`Authentication failed`);

            try {
                const result = await Book.deleteOne({ id : args.id});
                if(result.deletedCount === 0){
                    throw new Error(`Book not found`);
                }
                return { message : `Book Successfully deleted`};
            } catch (error) {
                throw new Error(`Error delteing the book`);
            }
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
