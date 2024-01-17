app.get('/slambook', async (req, res) => {
  try {
    
    const entries = await SlamBook.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/slambook/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
   
    const entry = await SlamBook.findById(entryId);

    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});