import { ImageResponse } from 'next/og'

// Apple touch icon — the approved LMVK Group lockup core (Brand Manual §02):
// onyx tile, ivory "LMVK" wordmark, centered gold divider. Rendered as a
// vector-crisp PNG so the touch icon never falls back to a non-brand mark.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#111111',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#F6F3EE',
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 9,
            paddingLeft: 9,
          }}
        >
          LMVK
        </div>
        <div
          style={{
            width: 72,
            height: 3,
            background: '#C9A227',
            marginTop: 16,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
