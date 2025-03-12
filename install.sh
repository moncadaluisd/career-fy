#!/bin/bash

# Exit on error
set -e

echo "Starting development servers..."

# Install dependencies in backend
echo "Installing dependencies in backend..."
cd backend
npm install

# Install dependencies in frontend
echo "Installing dependencies in frontend..."
cd ../frontend
npm install