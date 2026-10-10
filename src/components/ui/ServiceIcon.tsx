import { BrowserIcon } from '@phosphor-icons/react/dist/ssr/Browser';
import { BrainIcon } from '@phosphor-icons/react/dist/ssr/Brain';
import { StackIcon } from '@phosphor-icons/react/dist/ssr/Stack';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr/ShieldCheck';

export default function ServiceIcon({ slug, size = 32 }: { slug: string; size?: number }) {
  const Icon = ({ produse: BrowserIcon, ai: BrainIcon, infrastructura: StackIcon, consultanta: ShieldCheckIcon })[slug] ?? BrowserIcon;
  return <Icon size={size} weight="light" aria-hidden="true" />;
}
