// Unused — kept for compatibility
export default function CommandButton({ label, icon }: { label: string; icon: string; action?: string; params?: any }) {
  return <span>{icon} {label}</span>;
}
