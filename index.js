const express = require('express');
const cors = require('cors');
const app = express();
require('./src/db/conn');
const { admin, Vcatagory, vendor } = require('./src/models/register');
const port = 5000;
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');
app.use(cors({
    origin:["http://localhost:3000","https://cms-ffd8.onrender.com"],
    credentials: true
}));
app.use('/uploads', express.static('uploads'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname,"./frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
});

// ................................................for admin ........................................................
app.get("/",(req,res)=>{
    // res.send("hello from backend!!!");
    console.log("hello from backend!!!");
})
app.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    const user = await admin.findOne({ username: username });
    const u_pass = await admin.findOne({ password: password });
    if (user && u_pass) {
        res.send('true');
    }
    else {
        res.send('false');
    }
})

// ................................................for catagory ........................................................

app.post("/addcatagory", upload.single('image'), async (req, res) => {
    const catagory = req.body.catagory;
    const desc = req.body.desc;
    const check = req.body.check;
    const imgurl = req.file.path;
    const data = new Vcatagory({
        catagory: catagory, desc: desc, check: check, img: imgurl
    });
    const cat = await Vcatagory.findOne({ catagory: catagory });
    if (cat) {
        res.send('true');
    }
    else {
        await data.save();
        res.send('false');
    }
})
app.get("/addcatagory", async (req, res) => {
    const d = await Vcatagory.find({});
    res.send(d);
})

app.delete("/deletecat/:id", async (req, res) => {
    const {id} =req.params;
    console.log(id);
    console.log(req.method);
    // let i = JSON.stringify(id);
    var d = await Vcatagory.deleteOne({ _id: id });
    console.log(d);
    if(d.acknowledged){
        res.send("true");
    }
})
app.put("/updatecat/:id", async (req, res) => {
    const {id} =req.params;
    const {check} = req.body;
    console.log(id);
    console.log(check);
    // let i = JSON.stringify(id);
    var d = await Vcatagory.findByIdAndUpdate(id,{check:check},{new: true});
    console.log(d);
    res.send("true");
    
})

// .......................................................for product ......................................................

app.post("/addproduct", upload.single('image'), async (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const imgurl = req.file.path;
    const sku = req.body.sku;
    const cat = req.body.catagory;
    const pprice = req.body.pprice;
    const sprice = req.body.sprice;
    const qnt = req.body.qnt;
    const check = req.body.check;
    const data = new vendor({
         name:name,desc: desc,img: imgurl,sku:sku, cat: cat,pprice:pprice,sprice:sprice,qnt:qnt,check: check
    });
    const c = await Vcatagory.findOne({ catagory: cat });
    console.log(c);
    const n = await vendor.findOne({ name:name });
    console.log(n);
    if (c && !n) {
        res.send('true');
        await data.save();
    }
    else {
        res.send('false');
    }
})
app.get("/addproduct", async (req, res) => {
    const d = await vendor.find({});
    res.send(d);
})
app.put("/updatepro/:id", async (req, res) => {
    const {id} =req.params;
    const {check} = req.body;
    console.log(id);
    console.log(check);
    // let i = JSON.stringify(id);
    var d = await vendor.findByIdAndUpdate(id,{check:check},{new: true});
    console.log(d);
        res.send("true");
    
})
app.delete("/deletepro/:id", async (req, res) => {
    const {id} =req.params;
    console.log(id);
    console.log(req.method);
    // let i = JSON.stringify(id);
    var d = await vendor.deleteOne({ _id: id });
    console.log(d);
    if(d.acknowledged){
        res.send("true");
    }
})

// ......................................................server.......................................................

app.get("/giveproduct/:id", async (req, res) => {
    const {id} =req.params;
    const d = await vendor.findOne({ _id:id });
    console.log(d);
    res.json(d);
})

// ......................................................server.......................................................

app.listen(port, () => {
    console.log("server start:5000");
});