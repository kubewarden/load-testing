#!/usr/bin/env ruby

require 'json'

# Function to generate random labels and annotations
def generate_random_data
  random_labels = {
    environment: ['production', 'development', 'testing'].sample,
    team: ['team1', 'team2', 'team3'].sample
  }

  random_annotations = {
    description: ['hello', 'ciao', 'hola'].sample,
  }

  [random_labels, random_annotations]
end

# Function to generate namespace data
def generate_namespace_data(num_namespaces)
  namespaces = {
    apiVersion: "v1",
    kind: "List",
    metadata: {
      resourceVersion: "1246114"
    },
    items: []
  }

  num_namespaces.times do |i|
    labels, annotations = generate_random_data
    namespace_data = {
      metadata: {
        name: "namespace#{i + 1}",
        labels: labels,
        annotations: annotations,
        resourceVersion: "5",
        uid: "8a1084e1-9495-4569-bcd5-91cc1f4203ff",
      }
    }
    namespaces[:items] << namespace_data
  end

  namespaces
end

# Serialize namespace data to JSON
def serialize_to_json(namespace_data)
  namespace_data.to_json
end

# Get the number of namespace objects to create from command-line argument
num_namespaces = ARGV[0].to_i

# Validate input
if num_namespaces <= 0
  puts "Please provide a valid positive integer as the number of namespace objects to create."
  exit
end

# Generate namespace data
namespaces = generate_namespace_data(num_namespaces)

# Serialize namespace data to JSON
namespaces_json = serialize_to_json(namespaces)

# Output JSON
puts namespaces_json

