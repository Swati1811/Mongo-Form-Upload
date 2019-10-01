const express=require('express');
const app =express();
const mongoose=require('mongoose');
const user=require('./routes/user');
const cors=require('cors');

mongoose.connect('mongodb+srv://root:root@onlineorganicstore-fpv8x.mongodb.net/UserData?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to the Database..!!');
    })
    .catch(err=>{
        console.log('Error while connecting to the database..!!');
        process.exit(1);
    });    

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static('uploads'));
app.use('/user',user);

const PORT=process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log('Listening on port 3000..!!');
});
