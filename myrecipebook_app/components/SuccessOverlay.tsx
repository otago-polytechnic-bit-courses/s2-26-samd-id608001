import { router } from 'expo-router';
import { OverlayMessage } from './OverlayMessage';

interface SuccessOverlayProps {
  message: string;
  onPressOk?: () => void;
}

export function SuccessOverlay({
  message,
  onPressOk = () => {
    router.back();
  },
}: SuccessOverlayProps) {
  return (
    <OverlayMessage
      message={message}
      textClassNames="mt-3 text-xl font-bold text-neutral-600"
      onPressOk={onPressOk}
    />
  );
}
