const express = require('express');
const router = express.Router();
const Item = require('../model/Item');
const auth= require('./middleware/auth');


router.get('/all',auth, async (req, res) => {
  console.log("hit")
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/new',auth, async (req, res) => {
  console.log("api hit")
  try {
    const { title, description, status } = req.body;
    const newTask = new Item({
      title,
      description,
      status,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.json(task);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', getItem, (req, res) => {
  res.json(res.item);
});

router.put('/:id',auth,async (req, res) => {
  try {

    const id = req.params.id; 
    console.log("id", id);
    
    const updatedData = await Item.findByIdAndUpdate(id, req.body, { new: true });
    
    res.status(200).json(updatedData); 
  } 
  catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let {id}=req.params;
    console.log("id",id);
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;
