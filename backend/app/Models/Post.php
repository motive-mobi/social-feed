<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'author',
        'image',
        'description',
        'created_at',
        'updated_at'
    ];
}
