import { type ScannerDTO } from './ScannerDTO'
import { type VulnerabilitySummaryDTO } from './VulnerabilitySummaryDTO'

export interface NativeReportSummaryDTO {
  scanner?: ScannerDTO
  start_time?: string
  scan_status?: string
  summary?: VulnerabilitySummaryDTO
  complete_percent?: number
  end_time?: string
  duration?: number
  report_id?: string
  severity?: string
}
