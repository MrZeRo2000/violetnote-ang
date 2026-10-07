import {AppInfo, AppInfoVersions} from '../models/app';
import packageJson from '../../../package.json';

export function calcBackendFrontendVersions(appInfo: AppInfo): AppInfoVersions {
  return {version: packageJson.version, backendVersion: appInfo.version};
}

export function calcVersionsDifference(appInfo: AppInfoVersions): AppInfo {
  const supportedBackendVersion = packageJson.backendVersion;
  if (supportedBackendVersion === appInfo.backendVersion) {
    return {...appInfo, supportedBackendVersion, minorDifference: false, majorDifference: false};
  } else {
    const cv = supportedBackendVersion.split(".")
    const bv = appInfo.backendVersion.split(".")

    const k = Math.min(cv.length, bv.length)
    for (let i = 0; i < k; i++) {
      const ncv = parseInt(cv[i], 10)
      const nbv = parseInt(bv[i], 10)

      if (ncv !== nbv) {
        if ((i === k - 1) && (ncv > nbv)) {
          return {...appInfo, supportedBackendVersion, minorDifference: true, majorDifference: false};
        } else {
          return {...appInfo, supportedBackendVersion, minorDifference: false, majorDifference: true};
        }
      }
    }
    // should not get here
    return {...appInfo, supportedBackendVersion, minorDifference: false, majorDifference: false};
  }
}
