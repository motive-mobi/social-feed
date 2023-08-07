<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Post;

class PostRepository
{
    public function getPosts($page, $limit)
    {
        $posts = DB::table('posts')->skip($page)->take($limit)->get();
        /*$posts = Post::all();*/
        return $posts;
    }

    public function createPost(Request $request)
    {
        $filename = null;

        if($request->hasFile('image')){
            $file = $request->file('image');
            $file->move(public_path('images'), $file->getClientOriginalName());
            $filename = 'images'.'/'.$file->getClientOriginalName();
        }

        try {
            $post = Post::create([
                'author'        => $request->author,
                'description'   => $request->description,
                'image'         => $filename ? $filename : null,
            ]);
            return $post;
        } catch (\Esception $e) {
            return $e->getMessage();
        }
    }

    public function editPost($id)
    {
        $post = Post::find($id);
        return $post;
    }

    public function updatePost(Request $request)
    {
        $post = Post::find($request->id);
        $filename = null;

        if($request->hasFile('image')){
            $file = $request->file('image');
            $file->move(public_path('images'), $file->getClientOriginalName());
            $filename = 'images'.'/'.$file->getClientOriginalName();
        }

        try {
            $post->update([
                'author'        => $request->author,
                'description'   => $request->description,
                'image'         => $filename ? $filename : $post->image,
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