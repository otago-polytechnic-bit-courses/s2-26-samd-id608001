import { OverlayMessage } from './OverlayMessage';

interface ErrorOverlayProps {
  message: string;
}

export function ErrorOverlay({ message }: ErrorOverlayProps) {
  return (
    <OverlayMessage
      message={message}
      textClassNames="mt-3 text-xl font-bold text-red-600"
      onPressOk={() => {}}
    />
  );
}
