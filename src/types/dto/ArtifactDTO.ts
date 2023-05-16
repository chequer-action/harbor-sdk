import { type TagDTO } from './TagDTO';
import { type ScanOverviewDTO } from './ScanOverviewDTO';
import { type LabelDTO } from './LabelDTO';
import { type AccessoryDTO } from './AccessoryDTO';
import { type ReferenceDTO } from './ReferenceDTO';
import { type ExtraAttrsDTO } from './ExtraAttrsDTO';
import { type AnnotationsDTO } from './AnnotationsDTO';
import { type AdditionLinksDTO } from './AdditionLinksDTO';

export interface ArtifactDTO {
  size?: number
  push_time?: string
  scan_overview?: ScanOverviewDTO
  tags?: TagDTO[]
  pull_time?: string
  labels?: LabelDTO[]
  accessories?: AccessoryDTO[]
  references?: ReferenceDTO[]
  manifest_media_type?: string[]
  extra_attrs?: ExtraAttrsDTO
  id?: number
  digest?: string
  icon?: string
  repository_id?: number
  addition_links?: AdditionLinksDTO
  media_type?: string
  project_id?: number
  type?: string
  annotations?: AnnotationsDTO
}
