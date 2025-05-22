import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  tenant: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, tenantData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tenant: null,
  isLoading: true,

  loadUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: tenant } = await supabase
          .from('tenants')
          .select('*')
          .single();

        set({ user, tenant, isLoading: false });
      } else {
        set({ user: null, tenant: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ user: null, tenant: null, isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ user: data.user });
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, tenantData: any) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create tenant
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .insert([
          {
            name: tenantData.name,
            domain: tenantData.domain,
          },
        ])
        .select()
        .single();

      if (tenantError) throw tenantError;

      // Create initial admin role
      const { error: roleError } = await supabase
        .from('roles')
        .insert([
          {
            tenant_id: tenantData.id,
            name: 'Admin',
            permissions: { all: true },
          },
        ]);

      if (roleError) throw roleError;

      set({ user: authData.user, tenant: tenantData });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, tenant: null });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },
}));