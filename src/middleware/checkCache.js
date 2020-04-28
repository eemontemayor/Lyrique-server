//Middleware Function to Check Cache
checkCache = (req, res, next) => {
    const { id } = req.params;
  
    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
        res.send(data);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  };
  
  