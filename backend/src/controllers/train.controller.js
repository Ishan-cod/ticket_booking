import { Station } from "../models/station.model.js";
import { Train } from "../models/train.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Admin controls
// Train adder
const AddTrain = asyncHandler(async (req, res) => {
// Get train details
// Train number
// Train name
// trainType
// Train start
// Train end
const { trainname1, trainnumber1, traintype1, startstation1, endstation1, route1 } =
    req.body;
    
// Validate required fields
if (!trainname1 || !trainnumber1 || !traintype1 || !startstation1 || !endstation1 || !route1) {
    throw new ApiError(400, "All fields are required: trainname, trainnumber, traintype, startstation, endstation, route");
}

const trainname = trainname1.trim().toLowerCase();
const trainnumber = trainnumber1.trim();
const startstation = startstation1.trim().toLowerCase();
const endstation = endstation1.trim().toLowerCase();
const traintype = traintype1.trim().toLowerCase();

const train = await Train.findOne({
    $or: [{ trainname: trainname }, { trainnumber: trainnumber }],
  });

  if (train) throw new ApiError(400, "Train already exists");

if (!Array.isArray(route1)) throw new ApiError(400, "Route should be an array");

if (route1.length === 0) throw new ApiError(400, "Route array cannot be empty");

// Validate route entries
for (const path of route1) {
if (!path.station || !path.arrival || !path.depart) {
    throw new ApiError(400, "Each route entry must contain station, arrival, and depart fields");
}
}

  let routeArrayWithID = [];

  // route given would be
  // {station, arrival, depart}

// Using for...of instead of forEach to properly handle async operations
for (const path of route1) {
const stationName = path.station.trim().toLowerCase();
const arrivalTime = path.arrival.trim();
const departTime = path.depart.trim();
const stationdetail = await Station.findOne({ stationName: stationName });

if (!stationdetail) {
    throw new ApiError(404, `Station ${stationName} not found`);
}

const stationID = stationdetail._id;

routeArrayWithID.push({
    stationId: stationID,
    arrivalTime: arrivalTime,
    departureTime: departTime,
});
}

if (route1.length !== routeArrayWithID.length)
    throw new ApiError(
      500,
      "Interval server error, station route data not fed"
    );

const startStationDetail = await Station.findOne({
stationName: startstation,
});

if (!startStationDetail) {
throw new ApiError(404, `Start station ${startstation} not found`);
}

const startStationId = startStationDetail._id;

const endStationDetail = await Station.findOne({
stationName: endstation,
});

if (!endStationDetail) {
throw new ApiError(404, `End station ${endstation} not found`);
}

const endStationId = endStationDetail._id;

const createdTrain = await Train.create({
    trainname: trainname,
    trainnumber: trainnumber,
    traintype: traintype,
    start: startStationId,
    destination: endStationId,
    route: routeArrayWithID,
  });

  const trainDetail = await Train.find({
    trainname: trainname,
  });

if (!trainDetail || trainDetail.length === 0) throw new ApiError(500, "Train details cannot be obtained");

return res
.status(201)
.json(new ApiResponse(201, "Train created successfully", trainDetail));
});

export { AddTrain };
