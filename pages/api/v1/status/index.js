import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const max_connections = await database.query("SHOW max_connections;");
  const used_connections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';",
  );
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVerionValue = databaseVersionResult.rows[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVerionValue,
      },
    },
  });
}

export default status;
