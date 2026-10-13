import { router } from 'expo-router';
import { OverlayMessage } from './OverlayMessage';

interface SuccessOverlayProps {
  message: string;
}

export function SuccessOverlay({ message }: SuccessOverlayProps) {
  return (
    <OverlayMessage
      message={message}
      textClassNames="mt-3 text-xl font-bold text-neutral-600"
      onPressOk={() => router.back()}
    />
  );
}
