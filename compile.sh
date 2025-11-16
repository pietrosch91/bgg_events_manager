


operation=$1

if [ "$operation" == "build" ]; then
    echo "Building the project..."
    # Add your build commands here
    ng build bgg-sql-mngr
    ng buid processmanager

elif [ "$operation" == "run" ]; then
    ng serve test_app

elif [ "$operation" == "full" ]; then
    echo "Performing full build and run..."
    ng build bgg-sql-mngr
    ng build processmanager
    ng serve test_app

else
  echo "Usage: $0 {build|clean|full}"
  exit 1
fi