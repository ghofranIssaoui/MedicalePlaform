// types/bcryptjs.d.ts
declare module 'bcryptjs' {
    export function hash(password: string, saltRounds: number): Promise<string>;
    export function compare(password: string, hashedPassword: string): Promise<boolean>;
  }
  