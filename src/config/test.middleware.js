export class TestMiddleware {
    execute(req, res, next) {
        console.log('Middleware works!');
        // res.send({ message: 'Error' });
        next();
    }
}