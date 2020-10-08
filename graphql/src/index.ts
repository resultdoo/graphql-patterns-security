import express from 'express'
import { createServer } from 'http'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import { shield } from 'graphql-shield'
import compression from 'compression'
import depthLimit from 'graphql-depth-limit'
import { createRateLimitDirective } from 'graphql-rate-limit'

import permissions from './schema/permissions'
import typeDefs from './schema/schema'
import resolvers from './schema/resolvers'
import AuthFieldDirective from './schema/directives'

const app = express()

// Authorisation for execution of mutations and queries
const resolverPermissions = shield( permissions )

// Rate limiting for preventing batching attacks
const rateLimitDirective = createRateLimitDirective( { identifyContext: ( ctx ) => ctx.id } )

const schema = applyMiddleware(
	makeExecutableSchema( {
		typeDefs,
		resolvers,
		schemaDirectives: {
			auth: AuthFieldDirective,
			rateLimit: rateLimitDirective
		}
	} ),
	resolverPermissions
)

const server = new ApolloServer( {
	schema,
	// introspection: false, // You can use these two to disable introspection and the playground environment
	// playground: false,
	debug: false,
	validationRules: [ depthLimit( 2 ) ], // Limiting the query depth for preventing DDOS attacks
	context: async ( { req, connection } ) => {
		if ( ! req ) {
			return {
				user: connection?.context.user
			}
		}

		// Here you would parse a JWT token or something similar and then create
		// a user object based on that data
		const token = req.headers.token

		// Based on this token do your business logic to pass in data to
		// resolvers in context
		const user = {
			hasRole: ( role: string ) => {
				const roles = [ "blogger" ]
				// Insert your business logic here
				return roles.includes( role )
			},
			hasRoles: ( requiredRoles: Array<string>, userRoles: Array<string> ) => {
				for( let i = 0; i < requiredRoles.length; i++ ) {
					if ( ! userRoles.includes( requiredRoles[ i ] ) ) {
						return false
					}
				}
				return true
			},
			// This is a fake function - you can return any roles here you want in order
			// to check the functionality
			getUserRoles: () => {
				return [ "blogger" ]
			}
		}

		return {
			user
		}
	}
} )

server.applyMiddleware( { app, path: '/' } ) 
app.use( compression() )

const httpServer = createServer( app )

httpServer.listen( { port: process.env.PORT }, () => {
	console.log( `GraphQL started 🚀 ...` )
} )