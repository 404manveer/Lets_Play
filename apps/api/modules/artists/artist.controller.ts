import type { RequestHandler } from 'express';
import {
  createArtist,
  findAllArtists,
  findArtistById,
  updateArtist,
  deleteArtist,
} from './artist.model.js';
import { artistDto } from './artist.dto.js';
import type { CreateArtistRequestDto, UpdateArtistRequestDto, ArtistRow } from './artist.dto.js';
import { AppError } from '../../middleware/app-error.js';

export const getAllArtists: RequestHandler = async (req, res) => {
  const artists = await findAllArtists();
  res.status(200).json({
    success: true,
    data: artists.map(artistDto),
    message: 'Artists fetched successfully',
  });
};

export const getArtistById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  const artist = await findArtistById(id);
  if (!artist) throw new AppError(404, 'Artist not found');

  res.status(200).json({
    success: true,
    data: artistDto(artist),
    message: 'Artist fetched successfully',
  });
};

export const registerArtist: RequestHandler<{}, any, CreateArtistRequestDto> = async (
  req,
  res,
) => {
  const { name, bio, imageUrl } = req.body;
  if (!name) {
    throw new AppError(400, 'name is required');
  }

  const artist = await createArtist(name, bio, imageUrl);
  res.status(201).json({
    success: true,
    data: artistDto(artist),
    message: 'Artist created successfully',
  });
};

export const updateArtistById: RequestHandler<{ id: string }, any, UpdateArtistRequestDto> = async (
  req,
  res,
) => {
  const { id } = req.params;
  const { name, bio, imageUrl } = req.body;

  const fields: Partial<Pick<ArtistRow, 'name' | 'bio' | 'image_url'>> = {};
  if (name !== undefined) fields.name = name;
  if (bio !== undefined) fields.bio = bio;
  if (imageUrl !== undefined) fields.image_url = imageUrl;

  if (Object.keys(fields).length === 0) {
    throw new AppError(400, 'No valid fields provided to update');
  }

  const artist = await updateArtist(id, fields);
  if (!artist) throw new AppError(404, 'Artist not found');

  res.status(200).json({
    success: true,
    data: artistDto(artist),
    message: 'Artist updated successfully',
  });
};

export const deleteArtistById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  const artist = await deleteArtist(id);
  if (!artist) throw new AppError(404, 'Artist not found');

  res.status(200).json({
    success: true,
    data: artistDto(artist),
    message: 'Artist deleted successfully',
  });
};
