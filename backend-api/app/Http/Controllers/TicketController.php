<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TicketController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

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

        $ticket = $request->user()->tickets()->create([
            'title' => $fields['title'],
            'details' => $fields['details'] ?? '',
            'status' => 'open',
        ]);

        return response()->json($ticket, 201);
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


        $newStatus = $request->status;

        $ticket->update([
            'title' => $request['title'] ?? $ticket->title,
            'details' => $request['details'] ?? $ticket->details,
            'status' => $request['status'],
        ]);

        return response()->json($ticket, 200);
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
