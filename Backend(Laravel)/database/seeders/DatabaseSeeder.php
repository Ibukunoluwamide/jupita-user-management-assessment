<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(2)->create();

        // User::factory()->create([
        //     'full_name' => 'User User',
        //     'email' => 'user@user.com',
        //     ]);
            
         User::create([
            'full_name' => 'User User',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),

        ]);
    }
}
