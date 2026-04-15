<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ImportProgress implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $progress;
    public $timeLeft;

    /**
     * Create a new event instance.
     */
    public function __construct($progress, $timeLeft = 0)
    {
        $this->progress = $progress;
        $this->timeLeft = $timeLeft;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('import-status'),
        ];
    }

    /**
     * Explicit broadcast alias.
     */
    public function broadcastAs(): string
    {
        return 'import.progress';
    }
}
