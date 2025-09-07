
// lib/cloudinaryLoader.js
export const cloudinaryLoader= ({ src, width=275, quality=50 }:{src:string, width:number,quality?:number})=> {
  const q = quality || 'auto';
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/w_${width},c_limit,q_${q}/${src}`;
}

export default cloudinaryLoader
