import { rule } from 'graphql-shield'

const isAuthenticated = rule()( async ( parent, args, ctx, info ) => {
	if ( ctx.user !== null ) {
        return true
	}
	return false
} )

const isAdmin = rule()( async ( parent, args, ctx, info ) => {
	if ( ctx.user !== null ) {
		return ctx.user.hasRole( "admin" )
	}
	return false
} )

const isBlogger = rule()( async ( parent, args, ctx, info ) => {
	if ( ctx.user !== null ) {
		return ctx.user.hasRole( "blogger" )
	}
	return false
} )

export {
    isAuthenticated,
    isAdmin,
    isBlogger
}