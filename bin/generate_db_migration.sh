#!/usr/bin/env bash
set -euo pipefail

: "${MIGRATION_NAME:?MIGRATION_NAME must be set}"
: "${MIGRATIONS_DIR:?MIGRATIONS_DIR must be set}"
: "${TABLES_DIR:?TABLES_DIR must be set}"
: "${ATLAS_DEV_URL:?ATLAS_DEV_URL must be set}"

if [[ ! -d "${MIGRATIONS_DIR}" ]]; then
  echo "Error: MIGRATIONS_DIR does not exist: ${MIGRATIONS_DIR}" >&2
  exit 1
fi

if [[ ! -d "${TABLES_DIR}" ]]; then
  echo "Error: TABLES_DIR does not exist: ${TABLES_DIR}" >&2
  exit 1
fi

if ! command -v atlas >/dev/null 2>&1; then
  echo "Error: 'atlas' not found on PATH." >&2
  exit 1
fi

atlas migrate diff "${MIGRATION_NAME}" \
  --dir "file://${MIGRATIONS_DIR}" \
  --dir-format "flyway" \
  --to "file://${TABLES_DIR}" \
  --dev-url "${ATLAS_DEV_URL}"

find "${MIGRATIONS_DIR}" -maxdepth 1 -type f -name 'U*.sql' -print -delete

atlas migrate hash \
  --dir "file://${MIGRATIONS_DIR}" \
  --dir-format "flyway"