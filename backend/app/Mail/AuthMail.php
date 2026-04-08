<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AuthMail extends Mailable
{
    use Queueable, SerializesModels;

    // Make sure this is 'public' so it can be used in the view
    public function __construct(public $otp) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Account Verification: ' . $this->otp,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.otp',
        );
    }
}
