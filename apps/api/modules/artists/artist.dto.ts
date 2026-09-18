/** Raw shape of an `artists` table row, as returned by pg. */
export interface ArtistRow {
  id: number;
  name: string;
  bio: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

/** Body of POST /api/artists */
export interface CreateArtistRequestDto {
  name: string;
  bio?: string;
  imageUrl?: string;
}

/** Body of PUT /api/artists/:id — all fields optional, at least one required */
export type UpdateArtistRequestDto = Partial<CreateArtistRequestDto>;

/** Shape returned to clients for an artist, camelCase. */
export interface ArtistResponseDto {
  id: number;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const artistDto = (artist: ArtistRow): ArtistResponseDto => ({
  id: artist.id,
  name: artist.name,
  bio: artist.bio,
  imageUrl: artist.image_url,
  createdAt: artist.created_at,
  updatedAt: artist.updated_at,
});
