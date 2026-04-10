import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Ensure Pusher is set globally for Laravel Echo
if (typeof window !== 'undefined') {
  (window as any).Pusher = Pusher;

  (window as any).Echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY || 'somelongrandomkey123',
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
    wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? '8080', 10),
    wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? '8080', 10),
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME || 'http') === 'https',
    enabledTransports: ['ws', 'wss'],
  });
}

export const getEcho = () => {
    if (typeof window !== 'undefined') {
        return (window as any).Echo as Echo<any>;
    }
    return null;
}
