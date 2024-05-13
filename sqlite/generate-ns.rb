#!/usr/bin/env ruby
require 'optparse'
require 'erb'

NAMESPACE_TEMPLATE = <<~ERB
  ---
  apiVersion: v1
  kind: Namespace
  metadata:
    name: <%= namespace_name %>
    labels:
      color: <%= ["red", "green", "yellow"].sample %>
      testing: "true"
ERB

def create_namespaces(num_namespaces)
  num_namespaces.times do |i|
    namespace_name = "namespace-#{i}"
    namespace_yaml = generate_namespace_yaml(namespace_name)
    puts "Creating namespace #{namespace_name}"
    `echo '#{namespace_yaml}' | kubectl apply -f -`
    puts "Namespace #{namespace_name} created successfully"
  end
end

def generate_namespace_yaml(namespace_name)
  erb_template = ERB.new(NAMESPACE_TEMPLATE)
  erb_template.result(binding)
end

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: create_namespaces.rb [options]"
  opts.on("-n", "--num-namespaces NUMBER", Integer, "Number of namespaces to create") do |n|
    options[:num_namespaces] = n
  end
end.parse!

num_namespaces = options[:num_namespaces] || 5 # Default to 5 if not provided
create_namespaces(num_namespaces)

