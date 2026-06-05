import { BlitzLogo } from './BlitzLogo'

/** @deprecated Use BlitzLogo — kept for backward compatibility */
export function BlitzLogoSVG(props: {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}) {
  const size = props.size === 'xl' ? 'lg' : props.size ?? 'md'
  return <BlitzLogo className={props.className} size={size} showText={props.showText ?? true} />
}

export function BlitzLogoIcon(props: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const size = props.size === 'xl' ? 'lg' : props.size ?? 'md'
  return <BlitzLogo className={props.className} size={size} showText={false} />
}
