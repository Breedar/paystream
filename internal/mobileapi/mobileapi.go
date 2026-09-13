package mobileapi

import (
	"encoding/json"
	"net/http"
)

// DeviceRegistration represents a mobile device registering for push
// notifications and API access.
type DeviceRegistration struct {
	DeviceID   string `json:"device_id"`
	Platform   string `json:"platform"`
	PushToken  string `json:"push_token"`
	AppVersion string `json:"app_version"`
}

type registerResponse struct {
	Status   string `json:"status"`
	DeviceID string `json:"device_id"`
}

// RegisterDeviceHandler accepts a mobile device registration payload and
// acknowledges it, enabling seamless mobile app integration.
func RegisterDeviceHandler(w http.ResponseWriter, r *http.Request) {
	var reg DeviceRegistration
	if err := json.NewDecoder(r.Body).Decode(&reg); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if reg.DeviceID == "" || reg.Platform == "" {
		http.Error(w, "device_id and platform are required", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(registerResponse{
		Status:   "registered",
		DeviceID: reg.DeviceID,
	})
}
