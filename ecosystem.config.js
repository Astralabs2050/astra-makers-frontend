module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start", // This will run 'npm start'
      interpreter: "none", // No need to specify a custom interpreter
      watch: true, // Optional: Enable file watching
      env: {
        // Define environment variables here if needed
      },
      env_production: {
        // Define production-specific environment variables here if needed
      },
    },
  ],
};
