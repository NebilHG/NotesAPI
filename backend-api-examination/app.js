const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const noteRouter = require('./routes/notes');

const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')

app.use(express.json());
app.use('/api/docs', swaggerUI.serve);

app.get('/api/docs', swaggerUI.setup(apiDocs));

app.use('/api/user', userRouter);
app.use('/api/notes', noteRouter);


















app.listen(
    process.env.PORT || 3000,() =>{
        console.log('Server is running on port 3000');
    })