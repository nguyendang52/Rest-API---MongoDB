const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e2);

    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload file JPG, JPEG, PNG '));
    }
    cb(null, true);
  },

  // bonus
  // limits: {
  //   fileSize: 1000000,
  // },
  // fileFilter(req, file, cb) {
  //   1st way
  //   if (file.mimetype !== 'application/pdf') {
  //     return cb(new Error('File must be a PDF'));
  //   }
  //   cb(null, true);

  //   2nd way
  //   if (!file.originalname.match(/\.(doc|docx)$/)) {
  //     return cb(new Error('File must be a doc or docx'));
  //   }
  //   cb(null, true);
  // },
});
const uploadAvatar = upload.single('avatar');
module.exports = {
  uploadAvatar,
};
