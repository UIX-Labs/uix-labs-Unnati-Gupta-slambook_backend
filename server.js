app.post('/slambook', async (req, res) => {
  try {
    
    const newEntry = new SlamBook(req.body);

    
    await newEntry.save();
 res.status(201).json({ message: 'Entry Created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});