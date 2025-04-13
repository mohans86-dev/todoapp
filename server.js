
const expServer=require('express');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB=require('./db');

const app=expServer();

app.use(morgan('dev'));

app.use(expServer.json({}));
app.use(expServer.json({
    extended:true
}));

dotenv.config({
    path:'./config/config.env'
});

connectDB();

app.use('/api/todo/auth', require('./routes/user'));
app.use('/api/todo', require('./routes/Todo'));

const PORT=process.env.PORT || 3000;
app.listen(PORT, 
    console.log(`Server is running on port: ${PORT}`.red.underline.bold));