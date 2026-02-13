// This entry exists so that webpack emits a predictable "stylex.css" asset.
// The @stylexjs/unplugin collects all StyleX CSS globally and injects it into
// a single CSS file (configured via cssInjectionTarget in webpack.common.ts).
// Every page loads /bundles/stylex.css via a <link> tag in ReactPage.kt.
import './stylex-entry.css';
