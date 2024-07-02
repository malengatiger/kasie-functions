import * as admin from "firebase-admin";
import { VehicleArrival } from "../models/VehicleArrival";
import {
  TokenMessage,
  TopicMessage,
} from "firebase-admin/lib/messaging/messaging-api";
import { VehicleDeparture } from "../models/VehicleDeparture";
import { VehicleHeartbeat } from "../models/VehicleHeartbeat";
import { CommuterRequest } from "../models/CommuterRequest";
import { handleError } from "./error.api";
import { AmbassadorPassengerCount } from "../models/AmbassadorPassengerCount";
import { DispatchRecord } from "../models/dispatch_record";
import { getAssociationToken } from "./association.api";

export async function sendVehicleArrivalMessageApi(arrival: VehicleArrival) {
  try {
    const notif = {
      title: `Vehicle arrival ${arrival.vehicleReg}`,
      body: `Vehicle ${arrival.vehicleReg} arrived at ${arrival.landmarkName} - ${arrival.created}`,
    };
    const data = {
      ...Object.fromEntries(
        Object.entries(arrival).map(([key, value]) => [
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        ])
      ),
      date: new Date().toISOString(),
    };
    const topicMsg: TopicMessage = {
      topic: `vehicle_arrival_${arrival.associationId}`,
      data: data,
      notification: notif,
    };
    const topicMsg2: TopicMessage = {
      topic: `vehicle_arrival_${arrival.ownerId}`,
      data: data,
      notification: notif,
    };
    const messageId = await admin.messaging().send(topicMsg);
    const messageId2 = await admin.messaging().send(topicMsg2);
    sendToAssociation(arrival.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendVehicleArrivalMessage sent FCM message: ${messageId} and ${messageId2}`
    );
  } catch (error) {
    console.error(
      "🍎🍎🍎 sendVehicleArrivalMessage Error sending message:",
      error
    );
    handleError(
      `🍎🍎🍎 sendVehicleArrivalMessage Error sending message: ${error}`
    );
  }
}
export async function sendVehicleDepartureMessageApi(
  departure: VehicleDeparture
) {
  try {
    const notif = {
      title: `Vehicle departure ${departure.vehicleReg}`,
      body: `Vehicle ${departure.vehicleReg} departed from ${departure.landmarkName} at ${departure.created}`,
    };
    const data = {
      ...Object.fromEntries(
        Object.entries(departure).map(([key, value]) => [
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        ])
      ),
      date: new Date().toISOString(),
    };
    const topicMsg1: TopicMessage = {
      topic: `vehicle_departure_${departure.associationId}`,
      data: data,
      notification: notif,
    };
    const topicMsg2: TopicMessage = {
      topic: `vehicle_departure_${departure.ownerId}`,
      data: data,
      notification: notif,
    };
    const messageId = await admin.messaging().send(topicMsg1);
    const messageId2 = await admin.messaging().send(topicMsg2);
    sendToAssociation(departure.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendVehicleDepartureMessage sent FCM message: ${messageId} and ${messageId2}`
    );
  } catch (error) {
    console.error(
      "🍎🍎🍎 sendVehicleDepartureMessage Error sending message:",
      error
    );
    handleError(
      `🍎🍎🍎 sendVehicleDepartureMessage Error sending message: ${error}`
    );
  }
}
export async function sendVehicleHeartbeatMessageApi(
  heartbeat: VehicleHeartbeat
) {
  try {
    const notif = {
      title: `Vehicle heartbeat ${heartbeat.vehicleReg}`,
      body: `Vehicle ${heartbeat.vehicleReg} location updated - ${heartbeat.created}`,
    };
    const data = {
      ...Object.fromEntries(
        Object.entries(heartbeat).map(([key, value]) => [
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        ])
      ),
      date: new Date().toISOString(),
    };
    const topicMsg: TopicMessage = {
      topic: `vehicle_heartbeat_${heartbeat.associationId}`,
      data: data,
      notification: notif,
    };
    const topicOwnerMsg: TopicMessage = {
      topic: `vehicle_heartbeat_${heartbeat.ownerId}`,
      data: data,
      notification: notif,
    };
    const messageId = await admin.messaging().send(topicMsg);
    const messageId2 = await admin.messaging().send(topicOwnerMsg);
   sendToAssociation(heartbeat.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendVehicleHeartbeatMessage sent FCM message: ${messageId} and ${messageId2}`
    );
  } catch (error) {
    console.error(
      "🍎🍎🍎 sendVehicleHeartbeatMessage Error sending message:",
      error
    );
    handleError(
      `🍎🍎🍎 sendVehicleHeartbeatMessage Error sending message: ${error}`
    );
  }
}

export async function sendCommuterRequestMessageApi(
  commuterRequest: CommuterRequest
) {
  const data = {
    ...Object.fromEntries(
      Object.entries(commuterRequest).map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ])
    ),
    date: new Date().toISOString(),
  };
  const notif = {
    title: `Commuter Request for ${commuterRequest.destinationCityName}`,
    body: `Commuter requested a ride to ${commuterRequest.destinationCityName} at ${commuterRequest.dateRequested}`,
  };
  try {
    const topicMsg: TopicMessage = {
      topic: `commuter_request_${commuterRequest.routeId}`,
      data: data,
      notification: notif,
    };
    const topicMsg2: TopicMessage = {
      topic: `commuter_request_${commuterRequest.associationId}`,
      data: data,
      notification: notif,
    };
    const messageId = await admin.messaging().send(topicMsg);
    const messageId2 = await admin.messaging().send(topicMsg2);
    sendToAssociation(commuterRequest.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendCommuterRequestMessage sent FCM message: ${messageId} and ${messageId2}`
    );
  } catch (error) {
    console.error(
      "🍎🍎🍎 sendCommuterRequestMessage Error sending message:",
      error
    );
    handleError(
      `🍎🍎🍎 sendCommuterRequestMessage Error sending message: ${error}`
    );
  }
}

export async function sendPassengerCountMessageApi(
  passengerCount: AmbassadorPassengerCount
) {
  const data = {
    ...Object.fromEntries(
      Object.entries(passengerCount).map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ])
    ),
    date: new Date().toISOString(),
  };
  const notif = {
    title: `Passenger Count for ${passengerCount.vehicleReg}`,
    body: `Passengers In: ${passengerCount.passengersIn} Passengers Out: ${passengerCount.passengersOut}`,
  };
  try {
    const topicMsg: TopicMessage = {
      topic: `passenger_count_${passengerCount.routeId}`,
      data: data,
      notification: notif,
    };
    const topicMsg2: TopicMessage = {
      topic: `passenger_count_${passengerCount.associationId}`,
      data: data,
      notification: notif,
    };
    const topicMsg3: TopicMessage = {
      topic: `passenger_count_${passengerCount.ownerId}`,
      data: data,
      notification: notif,
    };

    const messageId = await admin.messaging().send(topicMsg);
    const messageId2 = await admin.messaging().send(topicMsg2);
    const messageId3 = await admin.messaging().send(topicMsg3);
    sendToAssociation(passengerCount.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendPassengerCountMessage sent FCM message: ${messageId}, ${messageId2} and ${messageId3}`
    );
  } catch (error) {
    console.error(
      "🍎🍎🍎 sendPassengerCountMessage Error sending message:",
      error
    );
    handleError(
      `🍎🍎🍎 sendPassengerCountMessage Error sending message: ${error}`
    );
  }
}

export async function sendDispatchMessageApi(dispatchRecord: DispatchRecord) {
  const data = {
    ...Object.fromEntries(
      Object.entries(dispatchRecord).map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ])
    ),
    date: new Date().toISOString(),
  };
  const notif = {
    title: `Vehicle Dispatch for ${dispatchRecord.vehicleReg}`,
    body: `Vehicle dispatched from ${dispatchRecord.landmarkName} at ${dispatchRecord.created}`,
  };
  try {
    const topicMsg: TopicMessage = {
      topic: `dispatch_${dispatchRecord.routeId}`,
      data: data,
      notification: notif,
    };
    const topicMsg2: TopicMessage = {
      topic: `dispatch_${dispatchRecord.associationId}`,
      data: data,
      notification: notif,
    };
    const topicMsg3: TopicMessage = {
      topic: `dispatch_${dispatchRecord.ownerId}`,
      data: data,
      notification: notif,
    };

    const messageId = await admin.messaging().send(topicMsg);
    const messageId2 = await admin.messaging().send(topicMsg2);
    const messageId3 = await admin.messaging().send(topicMsg3);

    sendToAssociation(dispatchRecord.associationId, data, notif);

    console.log(
      `🍎🍎🍎 sendDispatchMessage sent FCM message: ${messageId}, ${messageId2} and ${messageId3}`
    );
  } catch (error) {
    console.error("🍎🍎🍎 sendDispatchMessage Error sending message:", error);
    handleError(`🍎🍎🍎 sendDispatchMessage Error sending message: ${error}`);
  }
}

async function sendToAssociation(associationId: string, data: any, notif: any) {
  const assocToken = await getAssociationToken(associationId);
  if (assocToken) {
    const msg: TokenMessage = {
      data: data,
      notification: notif,
      token: assocToken?.token,
    };
    const messageId4 = await admin.messaging().send(msg);
    console.log(
      `🍎🍎🍎 sendToAssociation sent DIRECT FCM message: ${messageId4},`
    );
  }
}
