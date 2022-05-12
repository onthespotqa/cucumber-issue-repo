const fs = require('fs');

// Loads the Quarantine Manifest on cypress start
export default function configureQuarantine(_on, config, { quarantineFile }) {
  let quarantineList = [];
  try {
    quarantineList = JSON.parse(fs.readFileSync(quarantineFile))
    console.log(`cypress-quarantine: Will skip ${quarantineList.length} tests`);
    config.env.cypressQuarantine = quarantineList;
  } catch (err) {
    if (err.code !== 'ENOENT' && err.code !== 'EISDIR') {
      console.log('cypress-quarantine: Unexpected error loading quarantined tests:', err);
    }
    console.log('cypress-quarantine: Will run all tests');
  }
  return config
}
