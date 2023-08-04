<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PostRepository;

class PostController extends Controller
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
      $this->repository = $postRepository;
    }

    public function index()
    {
        return $this->repository->getPosts();
    }

    public function create(Request $request)
    {
        $data = $request->all();
        return $this->repository->createPost($data);
    }

    public function edit(Request $request)
    {
        $id = $request->all();
        return $this->repository->editPost($id);
    }

    public function update(Request $request)
    {
        $data = $request->all();
        return $this->repository->updatePost($data);
    }

    public function destroy(Request $request)
    {
        $id = $request->all();
        return $this->repository->deletePost($id);
    }
}
