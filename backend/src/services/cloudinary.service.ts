import cloudinary from '../config/cloudinary';

export async function uploadLocalFile(
  filePath: string,
  folder: string,
  resourceType: 'image' | 'auto' | 'raw' = 'image',
  mimetype?: string
) {
  // Detectar el tipo de archivo basado en la extensión y mimetype
  const ext = filePath.toLowerCase();
  let finalResourceType = resourceType;
  
  // Si es 'auto', intentar detectar el tipo real
  if (resourceType === 'auto') {
    // Verificar por mimetype primero (más confiable)
    if (mimetype) {
      if (mimetype.includes('pdf') || mimetype.includes('document') || 
          mimetype.includes('msword') || mimetype.includes('excel') || 
          mimetype.includes('text/') || mimetype.includes('application/octet-stream')) {
        finalResourceType = 'raw';
      } else if (mimetype.includes('image/')) {
        finalResourceType = 'image';
      }
    }
    
    // Si no se detectó por mimetype, usar extensión
    if (finalResourceType === 'auto') {
      if (ext.endsWith('.pdf') || ext.endsWith('.doc') || ext.endsWith('.docx') || 
          ext.endsWith('.xls') || ext.endsWith('.xlsx') || ext.endsWith('.txt')) {
        finalResourceType = 'raw';
      } else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || 
                 ext.endsWith('.gif') || ext.endsWith('.webp') || ext.endsWith('.svg')) {
        finalResourceType = 'image';
      }
    }
  }
  
  const uploadOptions: any = {
    folder,
    resource_type: finalResourceType,
  };
  
  // Para PDFs y archivos raw, asegurar que se suban correctamente
  if (finalResourceType === 'raw') {
    uploadOptions.use_filename = true;
    uploadOptions.unique_filename = true;
  }
  
  const res = await cloudinary.uploader.upload(filePath, uploadOptions);
  
  console.log(`Archivo subido a Cloudinary: ${filePath}, mimetype: ${mimetype || 'N/A'}, tipo detectado: ${finalResourceType}, URL: ${res.secure_url}`);
  
  return { url: res.secure_url, publicId: res.public_id };
}

export async function deleteByPublicId(publicId: string, resourceType?: 'image' | 'raw' | 'auto') {
  // Si no se especifica el tipo, intentar ambos
  if (!resourceType) {
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
  } else {
    try {
      const res = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      return res.result;
    } catch (e) {
      return 'error';
    }
  }
}
