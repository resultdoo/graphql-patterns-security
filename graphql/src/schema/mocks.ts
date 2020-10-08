import faker from 'faker'

const randomPick = ( min: number, max: number ) => {
    return faker.random.number( {
        min,
        max
    } )
}

const posts = () => {
    const data = []

    for( let i = 0; i < randomPick( 1, 5 ); i++ ) {
        data.push(
            {
                id: faker.random.uuid(),
                text: faker.random.words( 20 )
            }
        )
    }
    return data
}

const users = () => {
    const data = []

    for( let i = 0; i < randomPick( 1, 5 ); i++ ) {
        data.push(
            {
                id: faker.random.uuid(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName()
            }
        )
    }
    return data
}

const comments = () => {
    const data = []

    for( let i = 0; i < randomPick( 1, 5 ); i++ ) {
        data.push(
            {
                id: faker.random.uuid(),
                text: faker.random.words( 20 )
            }
        )
    }
    return data
}

export {
    posts,
    users,
    comments
}