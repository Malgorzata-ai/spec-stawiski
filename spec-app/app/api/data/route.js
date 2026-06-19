export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/event_data?key=eq.main&select=value`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        }
      }
    )
    const rows = await res.json()
    if (rows && rows.length > 0) return Response.json(rows[0].value)
    return Response.json(null)
  } catch(e) {
    return Response.json(null)
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/event_data`,
      {
        method: 'POST',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({ key: 'main', value: body })
      }
    )
    if (!res.ok) {
      const err = await res.text()
      return Response.json({ ok: false, error: err }, { status: 500 })
    }
    return Response.json({ ok: true })
  } catch(e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
