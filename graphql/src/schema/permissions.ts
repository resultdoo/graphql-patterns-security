import { and } from 'graphql-shield'

import { isAuthenticated, isBlogger, isAdmin } from '../rules'

export default {
    Query: {
        posts: and( isAuthenticated, isBlogger )
    },
    Mutation: {
        deletePost: and( isAuthenticated, isAdmin )
    }
}