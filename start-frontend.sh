#!/bin/bash

# Start the frontend React application
echo "Starting TodoList Frontend Server..."
cd frontend

# Check if .env file exists, if not create it from .env.example
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo ".env file created. You can modify it if needed."
fi

npm run dev
