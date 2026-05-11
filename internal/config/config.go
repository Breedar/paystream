package config

import "os"

// Config holds runtime configuration loaded from environment variables.
type Config struct {
	APIPort        string
	DatabaseURL    string
	RedisURL       string
	StellarNetwork string
}

// Load reads configuration from environment variables.
func Load() *Config {
	return &Config{
		APIPort:        getEnv("API_PORT", "8080"),
		DatabaseURL:    getEnv("DATABASE_URL", ""),
		RedisURL:       getEnv("REDIS_URL", ""),
		StellarNetwork: getEnv("STELLAR_NETWORK", "testnet"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}