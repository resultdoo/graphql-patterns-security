import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'

class AuthFieldDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition( field: GraphQLField<any, any>, details: any ) {
        const requiredRoles: Array<string> = this.args.requires
        const { resolve = defaultFieldResolver } = field
        
        field.resolve = async function( ...args ) {
            if ( ! requiredRoles ) {
                return resolve.apply( this, args )
            }

            const context = args[ 2 ]
            const user = context.user

            if ( user.hasRoles( requiredRoles, user.getUserRoles() ) ) {
                return resolve.apply( this, args )
            } else {
                throw new Error( `You do not have permission to view field ${ field.name }.` )
            }

        }

        return field

    }

}

export default AuthFieldDirective