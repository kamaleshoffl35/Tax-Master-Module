const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("./models/Product");
const Category = require("./models/Category")
const Unit = require("./models/Unit")
const Tax = require("./models/Tax")

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Product" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/categories", async (req,res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.json(category)
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
  
})
app.get("/api/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/units",async (req,res) => {
  try{
     const unit = new Unit(req.body)
     await unit.save()
     res.json(unit)
  }
  catch(err){
    res.status(400).json({ error: err.message })
  }
  
})

app.get("/api/units", async (req,res) => {
  const units =  await Unit.find()
  res.json(units)
})

app.post("/api/taxes",async (req,res) => {
  try{
     const tax = new Tax(req.body)
  await tax.save()
  res.json(tax)
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
  
})

app.get("/api/taxes", async (req,res) => {
  const taxes = await Tax.find()
  res.json(taxes)
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
