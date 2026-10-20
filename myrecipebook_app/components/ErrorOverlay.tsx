import { OverlayMessage } from './OverlayMessage';

interface ErrorOverlayProps {
  message: string;
  onPressOk?: () => void;
}

export function ErrorOverlay({
  message,
  onPressOk = () => {},
}: ErrorOverlayProps) {
  return (
    <OverlayMessage
      message={message}
      textClassNames="mt-3 text-xl font-bold text-red-600"
      onPressOk={onPressOk}
    />
  );
}
