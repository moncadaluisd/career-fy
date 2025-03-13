#!/bin/bash

# Exit on error
set -e

echo "Starting development servers..."

## addthe docker up when the person the parameter --docker
if [ "$1" == "--docker" ]; then
    echo "Starting docker..."
    docker-compose up -d

    # wait for the mongodb to be ready
    echo "Waiting for mongodb to be ready..."
    sleep 10
fi

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

