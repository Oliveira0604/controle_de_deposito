import { register } from '../services/AuthService';
import User from '../models/User';
import bcrypt from 'bcrypt';

jest.mock('../models/User');
jest.mock('bcrypt');

const mockReq = (body = {}) => ({
    body,
    flash: jest.fn()
});

const mockRes = () => ({
    render: jest.fn()
});

describe('Auth services', () => {
    test('deve retornar erro se o nome for inválido', async () => {
     
    });
}) 