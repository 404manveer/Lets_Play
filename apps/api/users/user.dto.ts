/** Raw shape of a `users` table row, as returned by pg. */
export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  display_name: string;
  created_at: Date;
  updated_at: Date;
}

/** Body of POST /api/users */
export interface CreateUserRequestDto {
  email: string;
  password: string;
  displayName: string;
}

/** Body of PUT /api/users/:id — all fields optional, at least one required */
export interface UpdateUserRequestDto {
  email?: string;
  displayName?: string;
  password?: string;
}

/** Shape returned to clients for a user, camelCase and without the password hash. */
export interface UserResponseDto {
  id: number;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userDto = (user: UserRow): UserResponseDto => ({
  id: user.id,
  email: user.email,
  displayName: user.display_name,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});
