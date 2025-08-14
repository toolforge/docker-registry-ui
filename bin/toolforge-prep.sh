#!/usr/bin/env bash
SINGLE_REGISTRY="true"
REGISTRY_SECURED="false"
REGISTRY_URL="https://docker-registry.svc.toolforge.org"
REGISTRY_TITLE="Toolforge Docker Registry"

BIN_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $BIN_DIR/../dist

SED=sed
if builtin hash gsed &>/dev/null; then
    SED=gsed
fi

$SED -i "s~\${REGISTRY_URL}~${REGISTRY_URL}~" index.html
$SED -i "s~\${REGISTRY_TITLE}~${REGISTRY_TITLE}~" index.html
$SED -i "s~\${PULL_URL}~${PULL_URL}~" index.html
$SED -i "s~\${SINGLE_REGISTRY}~${SINGLE_REGISTRY}~" index.html
$SED -i "s~\${CATALOG_ELEMENTS_LIMIT}~${CATALOG_ELEMENTS_LIMIT}~" index.html
$SED -i "s~\${SHOW_CONTENT_DIGEST}~${SHOW_CONTENT_DIGEST}~" index.html
$SED -i "s~\${DEFAULT_REGISTRIES}~${DEFAULT_REGISTRIES}~" index.html
$SED -i "s~\${READ_ONLY_REGISTRIES}~${READ_ONLY_REGISTRIES}~" index.html
$SED -i "s~\${SHOW_CATALOG_NB_TAGS}~${SHOW_CATALOG_NB_TAGS}~" index.html
$SED -i "s~\${HISTORY_CUSTOM_LABELS}~${HISTORY_CUSTOM_LABELS}~" index.html
$SED -i "s~\${USE_CONTROL_CACHE_HEADER}~${USE_CONTROL_CACHE_HEADER}~" index.html
$SED -i "s~\${TAGLIST_ORDER}~${TAGLIST_ORDER}~" index.html
$SED -i "s~\${CATALOG_DEFAULT_EXPANDED}~${CATALOG_DEFAULT_EXPANDED}~" index.html
$SED -i "s~\${CATALOG_MIN_BRANCHES}~${CATALOG_MIN_BRANCHES}~" index.html
$SED -i "s~\${CATALOG_MAX_BRANCHES}~${CATALOG_MAX_BRANCHES}~" index.html
$SED -i "s~\${TAGLIST_PAGE_SIZE}~${TAGLIST_PAGE_SIZE}~" index.html
$SED -i "s~\${REGISTRY_SECURED}~${REGISTRY_SECURED}~" index.html

grep -o 'THEME[A-Z_]*' index.html | while read e; do
  $SED -i "s~\${$e}~$(printenv $e)~" index.html
done

if [ -z "${DELETE_IMAGES}" ] || [ "${DELETE_IMAGES}" = false ] ; then
  $SED -i "s/\${DELETE_IMAGES}/false/" index.html
else
  $SED -i "s/\${DELETE_IMAGES}/true/" index.html
fi
