const BASE_ID = 'appAdxLhXqRtaq618'
const TABLE_ID = 'tbl7H4ONJWNAPqOP0'
const API = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`

const FIELDS = [
  'Title EN', 'Title JP', 'Slug', 'Status', 'Category',
  'Published At', 'Author', 'Read Time (min)',
  'Excerpt EN', 'Excerpt JP', 'Body EN', 'Body JP',
  'Cover Gradient', 'Tags',
]

function headers() {
  const token = import.meta.env.VITE_AIRTABLE_TOKEN
  if (!token) throw new Error('VITE_AIRTABLE_TOKEN not set — add it to .env.local')
  return { Authorization: `Bearer ${token}` }
}

function toPost({ id, fields: f }) {
  return {
    id,
    slug:          f['Slug']           ?? '',
    titleEN:       f['Title EN']       ?? '',
    titleJP:       f['Title JP']       ?? '',
    excerptEN:     f['Excerpt EN']     ?? '',
    excerptJP:     f['Excerpt JP']     ?? '',
    bodyEN:        f['Body EN']        ?? '',
    bodyJP:        f['Body JP']        ?? '',
    category:      f['Category']       ?? 'General',
    publishedAt:   f['Published At']   ?? '',
    author:        f['Author']         ?? 'Petra Tutors',
    readTime:      f['Read Time (min)'] ?? 5,
    coverGradient: f['Cover Gradient'] ?? 'linear-gradient(135deg, #120827 0%, #2E1654 100%)',
    tags:          f['Tags']           ?? [],
  }
}

export async function fetchPublishedPosts() {
  const params = new URLSearchParams()
  params.set('filterByFormula', "Status='Published'")
  params.set('sort[0][field]', 'Published At')
  params.set('sort[0][direction]', 'desc')
  FIELDS.forEach(f => params.append('fields[]', f))

  const res = await fetch(`${API}?${params}`, { headers: headers() })
  if (!res.ok) throw new Error(`Airtable ${res.status}`)
  const { records } = await res.json()
  return records.map(toPost)
}

export async function fetchPostBySlug(slug) {
  const params = new URLSearchParams()
  params.set('filterByFormula', `AND(Status='Published',Slug='${slug}')`)
  FIELDS.forEach(f => params.append('fields[]', f))

  const res = await fetch(`${API}?${params}`, { headers: headers() })
  if (!res.ok) throw new Error(`Airtable ${res.status}`)
  const { records } = await res.json()
  return records.length ? toPost(records[0]) : null
}
