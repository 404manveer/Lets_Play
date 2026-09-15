import bcrypt from 'bcryptjs';
import type { RequestHandler } from 'express';
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} from './user.model.js';
import { userDto } from './user.dto.js';
import type { CreateUserRequestDto, UpdateUserRequestDto, UserRow } from './user.dto.js';
import { AppError } from '../middleware/app-error.js';

const SALT_ROUNDS = 10;
const UNIQUE_VIOLATION = '23505';

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await findAllUsers();
  const safeUsers = users.map(userDto);
  res.status(200).json({
    success: true,
    data: safeUsers,
    message: 'Users fetched successfully',
  });
};

export const getUserByEmail: RequestHandler<{ email: string }> = async (req, res) => {
  const { email } = req.params;
  const user = await findUserByEmail(email);
  if (!user) throw new AppError(404, 'User not found');

  res.status(200).json({
    success: true,
    data: userDto(user),
    message: 'User fetched successfully',
  });
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) throw new AppError(404, 'User not found');

  res.status(200).json({
    success: true,
    data: userDto(user),
    message: 'User fetched successfully',
  });
};

export const registerUser: RequestHandler<{}, any, CreateUserRequestDto> = async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password || !displayName) {
    throw new AppError(400, 'email, password and displayName are required');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await createUser(email, passwordHash, displayName);
    res.status(201).json({
      success: true,
      data: userDto(user),
      message: 'User created successfully',
    });
  } catch (err: any) {
    if (err.code === UNIQUE_VIOLATION) {
      throw new AppError(409, 'A user with this email already exists');
    }
    throw err;
  }
};

export const updateUserById: RequestHandler<{ id: string }, any, UpdateUserRequestDto> = async (
  req,
  res,
) => {
  const { id } = req.params;
  const { email, displayName, password } = req.body;

  const fields: Partial<Pick<UserRow, 'email' | 'display_name' | 'password_hash'>> = {};
  if (email !== undefined) fields.email = email;
  if (displayName !== undefined) fields.display_name = displayName;
  if (password !== undefined) fields.password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  if (Object.keys(fields).length === 0) {
    throw new AppError(400, 'No valid fields provided to update');
  }

  try {
    const user = await updateUser(id, fields);
    if (!user) throw new AppError(404, 'User not found');

    res.status(200).json({
      success: true,
      data: userDto(user),
      message: 'User updated successfully',
    });
  } catch (err: any) {
    if (err.code === UNIQUE_VIOLATION) {
      throw new AppError(409, 'A user with this email already exists');
    }
    throw err;
  }
};

export const deleteUserById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  const user = await deleteUser(id);
  if (!user) throw new AppError(404, 'User not found');

  res.status(200).json({
    success: true,
    data: userDto(user),
    message: 'User deleted successfully',
  });
};
