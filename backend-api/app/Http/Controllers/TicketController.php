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
    //     return [ 'auth:sanctum',
    //     Middleware('auth:sanctum', except: ['index'])
    //     ];
    // }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request,)
    {
        $allTickets = Ticket::all();
        return $allTickets;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'details' => 'nullable',
        ]);
        
        $ticket = Ticket::create([
            'user_id' => 1,
            'title' => $fields['title'],
            'details' => $fields['details'],
            'status' => 'new'
        ]);
        return $ticket;
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
        $ticket = Ticket::findOrFail($id);
        $fields = $ticket->validate([
            'title' => 'required|max:255',
            'details' => 'required|email|unique:users',
        ]);

        $newStatus = $request->status;

        $ticket->update([
            'user_id' => 1,
            'title' => $fields['title'],
            'details' => $fields['details'],
            'status' => 'new'
        ]);
        
        return [
            'ticket' => $ticket,
            'newStatus' => $newStatus
        ];
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
