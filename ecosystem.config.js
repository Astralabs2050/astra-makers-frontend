module.exports = {
  apps: [
    {
       name: "next-app",
      script: "npm",
      args: "start",
      interpreter: "none", // Ensures npm is run as a shell command
      interpreter_args: "-r ts-node/register", // Register ts-node to compile TypeScript on the fly
      watch: true, // Optional: Enable file watching
      env: {
      
      },
      env_production: {
       
      },
    },
  ],
};
