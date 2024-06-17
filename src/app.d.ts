// See https://kit.svelte.dev/docs/types#app

import type { APIUser } from 'discord-api-types/v10';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      getUser: () => Promise<APIUser>;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
