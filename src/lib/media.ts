export const TELEGRAM_URL = 'https://t.me/timur_everyday'

const PNG_IDS = new Set([11, 12, 13, 14])

export function photoPath(id: number): string {
  const ext = PNG_IDS.has(id) ? 'png' : 'jpg'
  return `/photo/${id}.${ext}`
}

export const HERO_VIDEO = '/photo/gif1.mp4'
export const ABOUT_VIDEO = '/photo/gif12.mp4'
export const AVATAR = '/photo/gif100.jpg'

export const GALLERY_IDS = Array.from({ length: 14 }, (_, i) => i + 1)
