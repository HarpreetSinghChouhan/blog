<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();  
            $table->string('title');
            $table->foreignId('bloger_id')->constrained('users')->onDelete('cascade');         
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('footer')->default("null");
            $table->string('image')->nullable(); 
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('blogs');
    }
};
