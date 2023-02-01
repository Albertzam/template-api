import { ClientConfig } from '@interfaces'

export const configurationClient = (): ClientConfig => ({
  TCP: {
    url: process.env.TCP_URL,
    port: parseInt(process.env.TCP_PORT),
  },
  NATS: {
    servers: [process.env.NATS_URL],
  },
})
