const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config()
const userRoute = require('./routers/userRouter');
const defultRoute = require('./routers/defultRoute')
const app = express();

// app use json parce
app.use(express.json());


// app use route
app.use('/api/user',userRoute);
app.use(defultRoute)











// starte server function
const start = async ()=>{
    await connectDB(process.env.HOST_NAME);
    app.listen(5000,()=>{
        console.log('your server is up in port 5000...');
    })
}
start();