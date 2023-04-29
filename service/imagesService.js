import path from 'path';
import fs from 'fs-extra';

export const getImages = async (req, res) => {
  const __dirname = path.resolve(path.dirname(''));
  const image_path = path.resolve( __dirname, `./uploads/${req.params.folder}/${req.params.name}`);

  if (await fs.existsSync(image_path)){
    res.sendFile(image_path);
  }else {
    const pathNoImage = path.resolve( __dirname, `./uploads/user/berserk.jpg`);
    res.sendFile(pathNoImage);
  }
}

export default getImages;