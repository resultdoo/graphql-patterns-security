const schema = `
    directive @auth(requires: [String]) on FIELD_DEFINITION

    directive @rateLimit(
        max: Int,
        window: String,
        message: String,
        identityArgs: [String],
        arrayLengthField: String
    ) on FIELD_DEFINITION

    type Query {
        posts( input: PostInput ): [ Post ]
    }

    input PostInput {
        user: String
    }

    type Mutation {
        deletePost( input: DeletePostInput ): Boolean,
        passwordReset( input: ResetPasswordInput ): PasswordReset @rateLimit( window: "5m", max: 1, message: "You are doing this too often." )
    }

    type PasswordReset {
        success: Boolean
    }

    input ResetPasswordInput {
        username: String,
        password: String,
        resetCode: String
    }

    input DeletePostInput {
        id: String
    }

    type User {
        id: String,
        firstName: String @auth( requires: ["admin"] ),
        lastName: String,
        posts: [ Post ]
    }

    type Post {
        id: String,
        text: String,
        author: User,
        comments: [ Comment ]
    }

    type Comment {
        id: String,
        text: String,
        post: Post,
        author: User
    }
`

export default schema