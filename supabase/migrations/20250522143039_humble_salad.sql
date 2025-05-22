/*
  # Initial schema for multi-tenant HRMS

  1. New Tables
    - `tenants`
      - `id` (uuid, primary key)
      - `name` (text)
      - `domain` (text, unique)
      - `subscription_tier` (text)
      - `subscription_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `roles`
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, foreign key)
      - `name` (text)
      - `permissions` (jsonb)
      - `created_at` (timestamp)

    - `employees`
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, foreign key)
      - `auth_id` (uuid, references auth.users)
      - `role_id` (uuid, foreign key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `department` (text)
      - `position` (text)
      - `join_date` (date)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `email_templates`
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, foreign key)
      - `name` (text)
      - `subject` (text)
      - `content` (text)
      - `variables` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `workflows`
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `steps` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for tenant isolation
    - Add policies for role-based access
*/

-- Create tenants table
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE,
  subscription_tier text NOT NULL DEFAULT 'free',
  subscription_status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  permissions jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, name)
);

-- Create employees table
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  department text,
  position text,
  join_date date NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, email)
);

-- Create email_templates table
CREATE TABLE email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  variables jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, name)
);

-- Create workflows table
CREATE TABLE workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  steps jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, name)
);

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Create tenant access policies
CREATE POLICY "Tenants can view their own data"
  ON tenants
  FOR SELECT
  USING (id IN (
    SELECT tenant_id FROM employees WHERE auth_id = auth.uid()
  ));

-- Create role access policies
CREATE POLICY "Users can view roles in their tenant"
  ON roles
  FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM employees WHERE auth_id = auth.uid()
  ));

-- Create employee access policies
CREATE POLICY "Users can view employees in their tenant"
  ON employees
  FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM employees WHERE auth_id = auth.uid()
  ));

-- Create email template access policies
CREATE POLICY "Users can view email templates in their tenant"
  ON email_templates
  FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM employees WHERE auth_id = auth.uid()
  ));

-- Create workflow access policies
CREATE POLICY "Users can view workflows in their tenant"
  ON workflows
  FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM employees WHERE auth_id = auth.uid()
  ));

-- Create function to get current tenant_id
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT tenant_id 
    FROM employees 
    WHERE auth_id = auth.uid()
    LIMIT 1
  );
END;
$$;