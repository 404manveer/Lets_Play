import express from 'express';
import {
  getAllArtists,
  getArtistById,
  registerArtist,
  updateArtistById,
  deleteArtistById,
} from './artist.controller.js';

const router = express.Router();

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', registerArtist);
router.put('/:id', updateArtistById);
router.delete('/:id', deleteArtistById);

export default router;
