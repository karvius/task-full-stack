<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderBy('updated_at', 'desc')->get();
        return $users->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|min:7|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|numeric|digits_between:7,20'
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone']
        ]);

        $user->save();

        return response()->json('User Created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return $user->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $validatedData = $request->validate([
            'name' => 'required|min:7|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|numeric|digits_between:7,20'
        ]);

        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->phone = $validatedData['phone'];

        $user->save();

        return response()->json('User Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json('User Removed!');
    }

    /**
     * Import random user from JSONplaceholder API
     * 
     * @return \Illuminate\Http\Response
     */
    public function importRandom(\PlaceholderApiService $palceholder)
    {
        $randomUser = $palceholder->getRandomUser();

        $user = User::create([
            'name' => $randomUser['name'],
            'email' => $randomUser['email'],
            'phone' => $randomUser['phone']
        ]);

        $user->save();

        return response()->json('Random User Imported!');        
    }
}
