app.put('/slambook/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
   
    const updatedEntry = await SlamBook.findByIdAndUpdate(
      entryId,
      req.body,
      { new: true }
    );

    if (updatedEntry) {
      
      res.status(200).json({ message: 'Entry Updated', entry: updatedEntry });
    } else {
    
      res.status(404).json({ error: 'Entry Not Found' });
    }
  } catch (error) {
    console.error(error);


    res.status(500).json({ error: 'Internal Server Error' });
  }
})