const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(bodyParser.json());

let data =[
  { id: 1, name: 'Apple', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  { id: 2, name: 'Orange', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  { id: 3, name: 'Grapes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
]

app.get('/items', (req, res) => {
   res.json(data);
});

app.get('/items/:id', (req, res) => {
   const item_id = parseInt(req.params.id);
   const item=data.find((obj) => obj.id === item_id);
   if(!item){
     res.status(404).json({message: "Data not found"});
   }
   else {
     res.json(item);
   }
});

app.post('/items', (req, res) => {
    const newItem = req.body;
        data.push(newItem);
        res.status(201).json({message: 'data added'});
});
    
app.put('/items/:id', (req, res) => {
    const item_id = parseInt(req.params.id);
    const updateItem = req.body;
    const index = data.findIndex((obj) => obj.id === item_id)
    if(index !== -1){
        data[index] = {...data[index],...updateItem};
        res.json({message: "Object updated successfully" });
    }
    else {
       res.status(404).send("Not found");
    }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((obj) => obj.id === id)
    if(index !== -1){
        data.splice(index, 1);
        res.status(200).send("Object deleted successfully");
    } 
    else {
        res.status(404).send("Not found");
    }
});
    
app.listen(8080, () => {
    console.log("Server running successfully");
});