import { posts, users, comments } from './mocks'

const resolverMap = {
    Query: {
        posts: async ( _source: void, input: any, context: any ) => {
            return posts()
        }
    },
    Mutation: {
        passwordReset: async( _source:void, input: any, context: any ) => {
            return {
                success: false
            }
        }
    },
    User: {
        posts: async ( _source: any, input: any, context: any ) => {
            return posts()
        }
    },
    Post: {
        author: async ( _source: any, input: any, context: any ) => {
            return users()[ 0 ]
        },
        comments: async ( _source: any, input: any, context: any ) => {
            return comments()
        }
    },
    Comment: {
        post: async ( _source: any, input: any, context: any ) => {
            return posts()[ 0 ]
        },
        author: async ( _source: any, input: any, context: any ) => {
            return users()[ 0 ]
        }
    },
}

export default resolverMap