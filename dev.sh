#!/bin/bash

# Exit on error
set -e

echo "Starting development servers..."

# Start the backend server in the background
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Return to the root directory
cd ..

# Start the frontend server in the background
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

# Return to the root directory
cd ..

echo "Both servers are running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; echo 'Servers stopped'; exit 0" INT
wait

