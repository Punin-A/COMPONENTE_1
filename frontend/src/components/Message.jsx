import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Message({ type = 'info', children }) {
  const Icon = icons[type] || Info;
  return (
    <div className={`message message-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <Icon size={19} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
