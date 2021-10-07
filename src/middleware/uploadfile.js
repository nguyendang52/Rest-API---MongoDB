const multer = require('multer');
const upload = multer({
  dest: 'src/fileupload',
});
const uploadAvatar = upload.single('avatar');
module.exports = {
  uploadAvatar,
};
