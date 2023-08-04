<?php

namespace App\Repositories;

use Illuminate\Http\Request;

use App\Models\Post;

class PostRepository
{
    public function getPosts()
    {
        $posts = Post::all();
        return $posts;
    }

    public function createPost($data)
    {
        try {
            return Post::create($data);
        } catch (\Esception $e) {
            return $e->getMessage();
        }
    }

    public function editPost($id)
    {
        $post = Post::find($id);
        return $post;
    }

    public function updatePost($data)
    {
        $post = Post::find($data['id']);

        try {
            $post->update([
                'author'        => $data['author'],
                'description'   => $data['description'],
                'image'         => $data['image'] ? $data['image'] : $post->image,
            ]);
            return $post;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deletePost($id)
    {
        try {
            $post = Post::find($id);
            if( $post )
            {
                $post->each->delete();
                return TRUE;
            }

            return FALSE;

        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}