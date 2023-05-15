import { type AnnotationsDTO } from './AnnotationsDTO'
import { type PlatformDTO } from './PlatformDTO'

export interface ReferenceDTO {
  platform?: PlatformDTO
  child_digest?: string
  urls?: string[]
  parent_id?: number
  child_id?: number
  annotations?: AnnotationsDTO
}
