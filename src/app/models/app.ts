export interface AppInfoVersions {
  version: string,
  backendVersion: string
}

export interface AppInfo extends AppInfoVersions {
  supportedBackendVersion: string,
  minorDifference: boolean,
  majorDifference: boolean,
}
