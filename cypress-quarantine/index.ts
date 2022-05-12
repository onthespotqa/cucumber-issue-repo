let quarantineIsEnabled = true; // Toggle in order to stop or resume skipping tests in CI
let shouldSkip = false;

var mochaContext;

// declare global {
//   interface Window {
//     testState: { gherkinDocument: IGherkinDocument; pickles: IPickle[]; pickle: IPickle; };
//   }
// }

beforeEach(function () {
  mochaContext = this;
});

export function mochaBeforeEach() {
  const quarantineManifest = Cypress.env('cypressQuarantine')
  if (quarantineIsEnabled) {
      const contextName = mochaContext.currentTest.parent.title;
      const testName = mochaContext.currentTest.title;
      skipTest(contextName, testName, quarantineManifest)
  }
}

export function cucumberBefore() {
  const quarantineManifest = Cypress.env('cypressQuarantine')
  if (quarantineIsEnabled) {
      const testState = window.testState;
      const feature = testState.gherkinDocument.feature.name;
      const scenario = testState.pickle.name;
    skipTest(feature, scenario, quarantineManifest)
  }
}

function skipTest(context: string, testName: string, quarantineManifest?: [{ testcase: string, context: string }]) {
  const shouldSkip = !!quarantineManifest?.find(
    t => t?.testcase === testName && t?.context?.includes(context)
  );
  if (shouldSkip) {
    mochaContext.skip();
  }
}
