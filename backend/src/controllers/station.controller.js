import { Station } from "../models/station.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";

// Add stations (admin access)
const AddStation = asyncHandler(async (req, res) => {
  const { stationName, stationCode } = req.body;

  const station = await Station.findOne({
    $or : [
      {stationName : stationName.trim().toLowerCase()},
      {stationCode : stationCode.trim().toUpperCase()}
    ]
  })

  if(station)
    throw new ApiError(400, "Station already exist")


  if(!stationName || !stationCode)
    throw new ApiError(400, "Station details not provided")


  const stationDetail = await Station.create({
    stationName: stationName.toLowerCase(),
    stationCode: stationCode.toUpperCase(),
  });


  if(!stationDetail)
    throw new ApiError(500, "Station detail invalidated")

  res
    .status(200)
    .json({ message: "Station added successfully", stationDetail });


});


export {AddStation}