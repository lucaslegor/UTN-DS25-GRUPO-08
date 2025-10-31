import cloudinary from '../config/cloudinary';

export async function uploadLocalFile(
  filePath: string,
  folder: string,
  resourceType: 'image' | 'auto' = 'image'
) {
  const res = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: resourceType,
  });
  return { url: res.secure_url, publicId: res.public_id };
}

export async function deleteByPublicId(publicId: string) {
  try {
    const resImg = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    if (resImg.result === 'ok' || resImg.result === 'not_found') return resImg.result;
  } catch {}
  try {
    const resRaw = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    return resRaw.result;
  } catch (e) {
    return 'error';
  }
}
