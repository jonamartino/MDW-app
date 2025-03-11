export type UserRole = "user" | "organization";

export interface User {
    name: string;
    lastname: string;
    birthday: Date;
    email: string;
    isAdmin: boolean;
    firebaseUid: string;
    role: UserRole;
    organization: string;
  }