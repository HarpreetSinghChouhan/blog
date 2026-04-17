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
        Schema::create('slug_urls',function(Blueprint $table){
         $table->id();
         $table->string('shorturl')->unique();
         $table->char('correcturl');
         $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    Schema::dropIfExists('slug_urls');
    }
     
};
