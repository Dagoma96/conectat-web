import React, { useEffect, useState } from 'react';

export default function GlobalErrorCatcher() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      console.error('🌐 GlobalError:', event.error || event.message);
      setErrorMsg(String(event.error?.message || event.message));
    };
    const onUnhandled = (event: PromiseRejectionEvent) => {
      console.error('🌐 UnhandledRejection:', event.reason);
      setErrorMsg(String(event.reason?.message || event.reason));
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandled);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandled);
    };
  }, []);

  if (!errorMsg) return null;
  return (
    <div className="m-4 p-4 border rounded text-red-700 bg-red-50">
      <strong>Error global detectado:</strong>
      <div className="mt-2 text-sm whitespace-pre-wrap">{errorMsg}</div>
    </div>
  );
}