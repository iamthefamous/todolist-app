#!/bin/sh
# wait-for-mysql.sh: Wait for MySQL to be ready before starting the application

set -e

host="${MYSQL_HOST:-${1:-mysql}}"
port="${MYSQL_PORT:-${2:-3306}}"

echo "Waiting for MySQL at $host:$port..."

# Wait for MySQL to be ready (max 60 seconds)
max_attempts=60
attempt=0

while [ $attempt -lt $max_attempts ]; do
    # Use timeout with nc to test if port is open
    if nc -z -w 1 "$host" "$port" 2>/dev/null; then
        echo "MySQL is up - starting application"
        exec java -jar app.jar
    fi
    
    attempt=$((attempt + 1))
    echo "MySQL is unavailable - attempt ${attempt}/${max_attempts}"
    sleep 1
done

echo "ERROR: MySQL did not become ready in time"
exit 1
