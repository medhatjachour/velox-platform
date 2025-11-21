// Use CommonJS require to be compatible with Jest's default environment
require('@testing-library/jest-dom')

// Mock environment variables for tests
process.env.GROQ_API_KEY = 'test-api-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
