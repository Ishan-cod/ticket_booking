import { Station } from "../models/station.model.js";
import { Train } from "../models/train.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const trainDetailAtoB = asyncHandler(async (req, res) => {
  const { startStation, endStation } = req.body;

  //   If station not given as request

  if (!startStation || !endStation) throw new ApiError(400, "Station required");

  startStation.trim().toLowerCase();
  endStation.trim().toLowerCase();


  //   getting stationId from station Model
  const startStationId = await Station.findOne({ stationName: startStation });
  const endStationId = await Station.findOne({ stationName: endStation });


  if(!startStationId || !endStationId)
    throw new ApiError(500, "Station Id not fetched")



  
  // getting train detail with station matching start station and end station
  // train detail will be a array
  const trainDetail = await Train.find({
    route: { $all: [startStationId, endStationId] },
  });

  if (trainDetail.length == 0) throw new ApiError(400, "No train found");

  throw new ApiResponse(200, "Train detail found", trainDetail);
});

export { trainDetailAtoB };
