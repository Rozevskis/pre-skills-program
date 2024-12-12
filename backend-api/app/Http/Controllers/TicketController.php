<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
// use Illuminate\Routing\Controllers\HasMiddleware;
// use Illuminate\Routing\Controllers\Middleware;

class TicketController extends Controller
{
    // public static function middleware(): array
    // {
    //     return [ 'sanctum',
    //         new Middleware('sanctum', except: ['index', 'show'])
    //     ];
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allTickets = Ticket::all();
        return $allTickets;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
      Ticket::findOrFail($id)->delete();
        return  response('', 200); 
    }
}
