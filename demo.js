
const express = require('express')

const app = express()

const PORT = 8000;

app.get('/', (req,res)=>{
    console.log('Server is started');
})

app.listen(PORT, ()=>{
    console.log('Server is running on 8000');
})



