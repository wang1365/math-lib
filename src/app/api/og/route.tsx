import { ImageResponse } from 'next/og'

export function GET() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 70, background: '#fafaf8', color: '#171a21', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 86, height: 86, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#171a21', color: '#fff', fontSize: 56, fontFamily: 'Georgia, serif' }}>∑</div>
        <div style={{ fontSize: 37, fontWeight: 700 }}>OnlyMath</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
        <div style={{ maxWidth: 970, fontSize: 77, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.05em' }}>Find the right math resource for your next step.</div>
        <div style={{ fontSize: 28, color: '#59616d' }}>Clear paths. Curated resources. Useful tools.</div>
      </div>
      <div style={{ width: '100%', height: 4, background: '#2454a6' }} />
    </div>,
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400' } }
  )
}
