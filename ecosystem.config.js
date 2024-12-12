module.exports = {
  apps: [
    {
      name: "makers-frontend-app",
      script: "yarn", // Use yarn instead of npm
      args: "start", // This will run 'yarn start'
      watch: true, // Optional: Enable file watching for auto-restarts
      env: {
        NODE_ENV: "development", // You can define dev-specific env variables
      },
      env_production: {
        NODE_ENV: "production", // Define production-specific environment variables
      },
    },
  ],
};
