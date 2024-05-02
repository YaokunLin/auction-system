FROM postgres:16.2

# Set environment variables
ENV POSTGRES_PASSWORD=pwd

# Copy initialization script
COPY ./01-team036_p3_schema.sql /docker-entrypoint-initdb.d/01-init-db.sql
COPY ./02-mock-data.sql /docker-entrypoint-initdb.d/02-mock-data.sql
