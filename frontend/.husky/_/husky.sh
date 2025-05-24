#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) -" "$@"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ -z "$husky_skip_init" ]; then
    if [ "$HUSKY" = "0" ]; then
      debug "HUSKY env variable is set to 0, skipping hook" && exit 0
    fi
  fi
fi
