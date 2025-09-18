export const prisma = {
    profile: {
        create: jest.fn(),
        findUnique: jest.fn()
    },
    otpCode: {
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn()
    }
}