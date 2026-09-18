import pool from '../../db/pool.js';
import type { ArtistRow } from './artist.dto.js';

export const createArtist = async (
  name: string,
  bio: string | undefined,
  imageUrl: string | undefined,
): Promise<ArtistRow> => {
  const result = await pool.query<ArtistRow>(
    `INSERT INTO artists(name, bio, image_url)
    VALUES($1, $2, $3)
     RETURNING * `,
    [name, bio ?? null, imageUrl ?? null],
  );
  return result.rows[0];
};

export const findArtistById = async (id: string | number): Promise<ArtistRow | undefined> => {
  const result = await pool.query<ArtistRow>(`SELECT * FROM artists WHERE id =$1`, [id]);
  return result.rows[0];
};

export const findAllArtists = async (): Promise<ArtistRow[]> => {
  const result = await pool.query<ArtistRow>(`SELECT * FROM artists`);
  return result.rows;
};

export const updateArtist = async (
  id: string | number,
  fields: Partial<Pick<ArtistRow, 'name' | 'bio' | 'image_url'>>,
): Promise<ArtistRow | undefined> => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setString = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');
  const result = await pool.query<ArtistRow>(
    `
    UPDATE artists SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

export const deleteArtist = async (id: string | number): Promise<ArtistRow | undefined> => {
  const result = await pool.query<ArtistRow>(`DELETE FROM artists WHERE id = $1 RETURNING *`, [
    id,
  ]);
  return result.rows[0];
};
