echo "🅿️ 🅿️ 🅿️ 🅿️ Deploying all Kasie Cloud Functions ..."

echo "🍎🍎🍎 Deploying Ambassador Cloud Functions ..."
./deploy.ambassador.sh

echo "🍎🍎🍎 Deploying Association Cloud Functions ..."
./deploy.association.sh

echo "🍎🍎🍎 Deploying Storage Cloud Functions ..."
./deploy.cloud_storage.sh

echo "🍎🍎🍎 Deploying Commuter Cloud Functions ..."
./deploy.commuter.sh

echo "🍎🍎🍎 Deploying Dispatch Cloud Functions ..."
./deploy.dispatch.sh

echo "🍎🍎🍎 Deploying Generic Cloud Functions ..."
./deploy.generic.sh

echo "🍎🍎🍎 Deploying Route Cloud Functions ..."
./deploy.route.sh

echo "🍎🍎🍎 Deploying Vehicle Cloud Functions (Part 1) ..."
./deploy.vehicle1.sh

echo "🍎🍎🍎 Deploying Vehicle Cloud Functions (Part 2) ..."
./deploy.vehicle2.sh

echo "🅿️ 🅿️ 🅿️ 🅿️ Cloud Functions Deployment Complete!! 🍎🍎🍎"
