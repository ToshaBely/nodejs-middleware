module.exports = {
    products: [
        {
            title: 'One',
            reviews: [
                {title: 'One_test', mark: 1, createdAt: null, updatedAt: null},
                {title: 'Two_test', mark: 2, createdAt: null, updatedAt: null}
            ]
        },
        {title: 'Two', reviews: []},
        {title: 'Four', reviews: []},
        {title: 'Three', reviews: []}
    ],
    users: [
        {
            username: 'Anton Bely',
            login: 'abely',
            password: 'test1',
            authStrategy: null,
            authId: null
        },
        {
            username: 'John Doe',
            login: 'jdoe',
            password: 'test2',
            authStrategy: null,
            authId: null
        }
    ]
};