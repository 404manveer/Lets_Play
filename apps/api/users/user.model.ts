import pool from '../db/pool.js';
import type { UserRow } from './user.dto.js';

export const createUser = async (
  email: string,
  passwordHash: string,
  displayName: string,
): Promise<UserRow> => {
  const result = await pool.query<UserRow>(
    `INSERT INTO  users(email, password_hash, display_name)
    VALUES($1, $2, $3)
     RETURNING * `,
    [email, passwordHash, displayName],
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<UserRow | undefined> => {
  const result = await pool.query<UserRow>(`SELECT * FROM users WHERE email =$1`, [email]);
  return result.rows[0];
};

export const findUserById = async (id: string | number): Promise<UserRow | undefined> => {
  const result = await pool.query<UserRow>(`SELECT * FROM users WHERE id =$1`, [id]);
  return result.rows[0];
};

export const findAllUsers = async (): Promise<UserRow[]> => {
  const result = await pool.query<UserRow>(`SELECT * FROM users`);
  return result.rows;
};

export const updateUser = async (
  id: string | number,
  fields: Partial<Pick<UserRow, 'email' | 'display_name' | 'password_hash'>>,
): Promise<UserRow | undefined> => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setString = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');
  const result = await pool.query<UserRow>(
    `
    UPDATE users SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

export const deleteUser = async (id: string | number): Promise<UserRow | undefined> => {
  const result = await pool.query<UserRow>(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
};
