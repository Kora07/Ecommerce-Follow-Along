const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/'); 
    },
    filename: function(req, file, cb) {
      const uniqueSuffix =  Date.now() + '-' + Math.round.apply(Math.random() * 1e9);
      
       const filename = file.originalname.split(".")[0];
       cb(null,filename + "-" + uniqueSuffix + ".png"); 
    },
  });


  const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'productupload/'); 
    },
    filename: function(req, file, cb) {
      const uniqueSuffix =  Date.now() + '-' + Math.round.apply(Math.random() * 1e9);
      
       const filename = file.originalname.split(".")[0];
       cb(null,filename + "-" + uniqueSuffix + ".png"); 
    },
  });
  
exports.upload = multer({ storage: storage });
exports.productupload = multer({ storage: productStorage });