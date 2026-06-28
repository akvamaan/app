export const TELEGRAM_URL = 'https://t.me/photo_kakoyto'

export function photoPath(id: number): string {
  return `/photo/${id}.webp`
}

export const HERO_VIDEO = '/photo/newvideo.webm'
export const CTA_VIDEO = '/photo/gif1.webm'
export const ABOUT_VIDEO = '/photo/gif12.webp'
export const AVATAR = '/photo/gif100.webp'
export const TESTIMONIAL_PHOTO_1 = '/photo/human1.png'
export const TESTIMONIAL_PHOTO_2 = '/photo/human2.png'
export const TESTIMONIAL_PHOTO_3 = '/photo/human3.png'

export const GALLERY_IDS = Array.from({ length: 14 }, (_, i) => i + 1)
