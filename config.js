module.exports = {
    db: {
        dev: {
            host: 'ds119508.mlab.com',
            port: '19508',
            name: 'posts',
            usr: 'writer',
            pwd: 'qwe'
        },
        test: {
            host: 'ds145188.mlab.com',
            port: '45188',
            name: 'test_posts',
            usr: 'writer',
            pwd: 'qwe'
        }
    },
    auth: {
        secretKey: 'mySuperSecretKey'
    }

};
