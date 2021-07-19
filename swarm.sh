#!/bin/bash

cores=8

# start SLAVE (clients)
echo -e "\nStart LOCUST SLAVES\n"
PID_SLAVES=( )
for ((i = 1; i <= $cores; i++));do
  locust -f validate-policy.py --worker & #--master-host=$MASTER_IP --master-port=$MASTER_PORT -L $LOG_LEVEL --logfile=$LOG &
  PID_SLAVES+=( $! )
done
echo "LOCUST SLAVE PIDs = ${PID_SLAVES[@]}"
