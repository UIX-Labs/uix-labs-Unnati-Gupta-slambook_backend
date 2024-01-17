app.delete('/slambook/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
    
    const deletedEntry = await SlamBook.findByIdAndDelete(entryId);

    if (deletedEntry) {
      
      res.status(200).json({ message: 'Entry Deleted', entry: deletedEntry });
    } else {
   
      res.status(404).json({ error: 'Entry Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
