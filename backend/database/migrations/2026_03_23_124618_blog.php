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
        Schema::create('blog',function (Blueprint $table){
            $table->id();
            $table->string('title');
            $table->foreignId('bloger_id')->constrained("users",'id');
            $table-> string('header');
            $table->longBlob('image');
            $table->string('Description');
            $table->string('footer')->default("null");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('blog');
    }
};
