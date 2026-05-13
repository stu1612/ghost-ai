import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveSSLMode(url: string): string {
  // pg-connection-string will change 'prefer'/'require'/'verify-ca' semantics in v3.
  // Explicitly use 'verify-full' to preserve the current (stricter) behavior.
  return url.replace(/sslmode=(prefer|require|verify-ca)\b/, 'sslmode=verify-full')
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ''
  if (url.startsWith('prisma+postgres://')) {
    return new PrismaClient({ accelerateUrl: url })
  }
  const adapter = new PrismaPg({ connectionString: resolveSSLMode(url) })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
