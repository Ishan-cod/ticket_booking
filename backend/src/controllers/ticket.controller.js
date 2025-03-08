import { Ticket } from "../models/ticket.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Train } from "../models/train.model.js";
import { Station } from "../models/station.model.js";

// Show all tickets booked by user
const showAllBookedTicket = asyncHandler(async (req, res) => {
  const username = req.body.username;
  if (!username) throw new ApiError(400, "Username not provided");

  const userWithUsername = await User.findOne({
    username: username,
  });

  if (!userWithUsername)
    throw new ApiError(401, "User Donot exist in database");

  const userId = userWithUsername._id;

  const ticketDetails = await Ticket.find({
    passenger: userId,
  });

  if (!ticketDetails)
    throw new ApiError(500, "Cannot fetch ticket details for the user ");

  if (ticketDetails.size() === 0) throw new ApiResponse(200, "No ticket found");

  res.status(200);
  throw new ApiResponse(
    200,
    "Ticket details for the user found",
    ticketDetails
  );
});

// get all details of trains available when user give station details
const getTrainDetails = asyncHandler(async (req, res) => {
  const { startStation, endStation } = req.body;
    if(!startStation || !endStation)
        throw new ApiError(400, " Stations not provided ")

  const startStationID = await Station.findIOne({
    stationName: startStation,
  })._id;
  const endStationID = await Station.findOne({
    stationName: endStation,
  })._id;


  if(!startStationID || !endStationID)
    throw new ApiError(401, "Stations donot exist in database")


  const trainsDetails = await Train.find({
    "route.stationId": { $all: [startStationID, endStationID] },
  });

  if (trainsDetails.size() == 0)
    return new ApiResponse(200, "NO DIRECT TRAIN FOUND");

  if (!trainsDetails) return new ApiError(500, "Train cannot be fetched");

  res.status(200);
  throw new ApiResponse(200, "Train details found", trainsDetails);
});

const bookTicket = asyncHandler(async (req, res) => {
  // getTrain details from userFrontend
  // Train number
  //
});

export { showAllBookedTicket, getTrainDetails };
