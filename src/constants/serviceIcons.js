import {
  Zap,
  Wind,
  Snowflake,
  Lightbulb,
  Fan,
  Plug,
  PlugZap,
  Wrench,
  ShieldCheck,
  ClipboardCheck,
  Cable,
  AlertTriangle,
  LayoutGrid,
} from 'lucide-react'

// Maps a category's `icon` value to a Lucide icon component.
const CATEGORY_ICON_MAP = {
  Zap,
  Wind,
}

// Optional per-service overrides, keyed by service slug. Falls back to
// the parent category's icon when a service isn't listed here.
const SERVICE_ICON_MAP = {
  'switch-repair': Plug,
  'switch-replacement': PlugZap,
  'socket-repair': Plug,
  'socket-replacement': PlugZap,
  'switch-board-repair': LayoutGrid,
  'switch-board-replacement': LayoutGrid,
  'fan-repair': Fan,
  'fan-installation': Fan,
  'light-installation': Lightbulb,
  'light-repair': Lightbulb,
  'mcb-repair': ShieldCheck,
  'mcb-replacement': ShieldCheck,
  'electrical-wiring': Cable,
  'short-circuit-troubleshooting': AlertTriangle,
  'electrical-inspection': ClipboardCheck,
  'general-electrical-repair': Wrench,
  'ac-servicing': Wind,
  'ac-repair': Wind,
  'ac-installation': Snowflake,
}

export function getCategoryIcon(category) {
  return CATEGORY_ICON_MAP[category?.icon] ?? Zap
}

export function getServiceIcon(service, category) {
  return SERVICE_ICON_MAP[service?.slug] ?? getCategoryIcon(category)
}