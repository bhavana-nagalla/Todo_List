const express=require('express');
const mongoose=require('mongoose');
const Task=require('./model');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors({
    origin:'*'
}))

mongoose.connect("+smongodbrv://bhavana:E1GQwcjNjtpZdOst@cluster0.nfap5ac.mongodb.net/").then(
    ()=>console.log("DB Connected")
).catch(err=>console.log(err));

app.post('/addtask',async (req,res)=>{
    const {todo}=req.body;
    try{
       
        const newtask=new Task({
            todo : todo
        });
        await newtask.save();
        return res.json(await Task.find());
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/gettask',async (req,res)=>{
    try{
        return res.json(await Task.find());
    }
    catch(err){
        console.log(err.message);
    }
})

app.delete('/delete/:id',async (req,res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id);
        return res.json(await Task.find());
    }
    catch(err){
        console.log(err.message);
    }
})
    


app.listen(5000,()=>console.log("server running..."));

