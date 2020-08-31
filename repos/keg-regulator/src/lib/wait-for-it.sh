#!/bin/bash
#   Use this script to test if a given TCP host/port are available
#   It's been slightly modified to provide better logging re-useability
#   https://docs.docker.com/compose/startup-order/
#   https://github.com/vishnubob/wait-for-it/

CMD_NAME=$(basename $0)

# Add the logging helpers
source $(pwd)/src/lib/logging.sh

# ------ Helper functions ------ #

keg_help(){
  
  echo "Usage:"
  echo "  $CMD_NAME host:port [-s] [-t timeout] [-- command args]"
  echo "  -h HOST | --host=HOST       Host or IP under test"
  echo "  -p PORT | --port=PORT       TCP port under test"
  echo "                              Alternatively, you specify the host and port as host:port"
  echo "  -s | --strict               Only execute subcommand if the test succeeds"
  echo "  -q | --quiet                Don't output any status messages"
  echo "  -t TIMEOUT | --timeout=TIMEOUT"
  echo "                              Timeout in seconds, zero for no timeout"
  echo "  -- COMMAND ARGS             Execute command with args after the test finishes"

  exit 1
}

# Waits for a host and port to become responsive
# Logs message when they are
# Returns the exit code response after timeout or success
keg_wait_for_host(){

  local START_TIME=$(date +%s)
  local WAIT_PRINT
  
  while :
  do
    if [[ $ISBUSY -eq 1 ]]; then
      nc -z $HOST $PORT
      RESULT=$?
    else
      (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1
      RESULT=$?
    fi
    if [[ $RESULT -eq 0 ]]; then
      local END_TIME=$(date +%s)
      keg_success "$CMD_NAME: $HOST:$PORT is available after $((END_TIME - START_TIME)) seconds"
      break
    else
      
      if [[ -z $WAIT_PRINT ]]; then
        WAIT_PRINT=true

        if [[ $TIMEOUT -gt 0 ]]; then
          keg_warn "$CMD_NAME: waiting $TIMEOUT seconds for $HOST:$PORT"
        else
          keg_warn "$CMD_NAME: waiting for $HOST:$PORT without a timeout"
        fi
      fi
    fi
    sleep 1
  done

  return $RESULT
}

keg_wait_wrapper(){

  # In order to support SIGINT during timeout: http://unix.stackexchange.com/a/57692
  if [[ $QUIET -eq 1 ]]; then
    timeout $TIMEOUT $0 --quiet --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
  else
    timeout $TIMEOUT $0 --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
  fi

  PID=$!
  trap "kill -INT -$PID" INT
  wait $PID
  RESULT=$?

  if [[ $RESULT -ne 0 ]]; then
    keg_error "$CMD_NAME: timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
  fi

  return $RESULT
}

# Parse the passed in process arguments
keg_parse_arguments(){
  while [[ $# -gt 0 ]]; do
    case "$1" in
      *:* )
      HOST_PORT=(${1//:/ })
      HOST=${HOST_PORT[0]}
      PORT=${HOST_PORT[1]}
      shift 1
      ;;
      --child)
      CHILD=1
      shift 1
      ;;
      -q | --quiet)
      QUIET=1
      shift 1
      ;;
      -s | --strict)
      STRICT=1
      shift 1
      ;;
      -h)
      HOST="$2"
      if [[ $HOST == "" ]]; then break; fi
      shift 2
      ;;
      --host=*)
      HOST="${1#*=}"
      shift 1
      ;;
      -p)
      PORT="$2"
      if [[ $PORT == "" ]]; then break; fi
      shift 2
      ;;
      --port=*)
      PORT="${1#*=}"
      shift 1
      ;;
      -t)
      TIMEOUT="$2"
      if [[ $TIMEOUT == "" ]]; then break; fi
      shift 2
      ;;
      --timeout=*)
      TIMEOUT="${1#*=}"
      shift 1
      ;;
      --)
      shift
      CLI=("$@")
      break
      ;;
      --help)
      keg_help
      ;;
      *)
      keg_error "Unknown argument: $1"
      keg_help
      ;;
    esac
  done
}

# Sets the default config values for running the wait task
keg_set_defaults(){

  # Ensure a host and port are set
  if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    keg_error "Arguments host and port are required to test."
    keg_help
  fi

  # Set the default values || overrides
  TIMEOUT=${TIMEOUT:-15}
  STRICT=${STRICT:-0}
  CHILD=${CHILD:-0}
  QUIET=${QUIET:-0}

}

# Check to see if timeout is from busybox, and set flag for later use
keg_check_timeout_type(){
  TIMEOUT_PATH=$(realpath $(which timeout))
  if [[ $TIMEOUT_PATH =~ "busybox" ]]; then
    ISBUSY=1
  else
    ISBUSY=0
  fi
}

# Sets the result base on child process exit code
keg_set_result(){

  if [[ $CHILD -gt 0 ]]; then
    keg_wait_for_host
    RESULT=$?
    exit $RESULT
  else
    if [[ $TIMEOUT -gt 0 ]]; then
      keg_wait_wrapper
      RESULT=$?
    else
      keg_wait_for_host
      RESULT=$?
    fi
  fi
  
}

# Checks for a result from the timeout process
# If not 0, then log error and exit
# Otherwise call CLI cmd
keg_check_for_result(){
  if [[ $CLI != "" ]]; then
    if [[ $RESULT -ne 0 && $STRICT -eq 1 ]]; then
      keg_error "$CMD_NAME: strict mode, refusing to execute subprocess"
      exit $RESULT
    fi
    exec "${CLI[@]}"
  else
    exit $RESULT
  fi
}

# ------ Run the wait tasks ------ #

keg_parse_arguments "$@"

keg_set_defaults "$@"

keg_check_timeout_type "$@"

keg_set_result "$@"

keg_check_for_result "$@"
