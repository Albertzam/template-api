import { INatsConfig, ITcpConfiguration } from '@interfaces'

export interface ClientConfig {
  TCP?: ITcpConfiguration
  NATS?: INatsConfig
  REDIS?: string
}
